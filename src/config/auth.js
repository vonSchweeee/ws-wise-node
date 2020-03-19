const uuid = require('uuid').v4;
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwtConfig').secret;
const UsuarioDAO = require('../app/controllers/DAO/UsuarioDAO');
const Usuario = require('../app/models/Usuario');

module.exports = (app) => {

    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDAO = new UsuarioDAO();
            Usuario.findOne({where:{email: email}})
                .then(usuario => {
                 usuarioDAO.validaSenha(senha, usuario.senha).then((senhaValidada) => {
                    if(senhaValidada){
                       done(null, usuario);
                    }
                    else{
                        done(null, false, {msg: 'Senha inválida.'});
                    }
                 });
                })
                .catch(erro => {
                    console.log(erro);
                    done(erro, false)
                });
        }));
        
    passport.use(new JWTstrategy({
        secretOrKey : jwtSecret,
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
      }, (jwtPayload, done) => {
            return done(null, jwtPayload.usuario);
    }));

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        };

        done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao);
    });

    app.use(sessao({
        secret: 'gjnasasmnasjkmnas',
        // genid: function(req) {
        //     return uuid();
        // },
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(function (req, resp, next) {
        req.passport = passport;
        next();
    });
};