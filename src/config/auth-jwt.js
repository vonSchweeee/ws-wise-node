const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwtSecret = require('./jwtConfig');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UsuarioDAO = require('../app/controllers/DAO/UsuarioDAO');
const db = require('./mysql');

module.exports = (app) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha'
        },
        (email, senha, done) => {
            const usuarioDAO = new UsuarioDAO(db);
            usuarioDAO.findByEmail(email)
                .then(usuario => {
                    if (! usuario){
                        return done(null, false, {message: 'Usuário não encontrado.'})
                    }
                    return done(null, usuario);
                    
                    
                }).catch(erro => done(erro, false, {message: 'Erro ao realizar login!'}));
        }));

    passport.use(new JWTstrategy({
        secretOrKey : jwtSecret,
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
      }, (jwtPayload, done) => {
            console.log(jwtPayload.usuario);
            return done(null, jwtPayload.usuario);
    }));
    

    app.use((req, resp, next) => {
        req.passport = passport;
        next();
    });
};