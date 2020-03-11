const UsuarioDAO = require('./DAO/UsuarioDAO');
const usuarioDAO = new UsuarioDAO();
var jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('../../config/jwtConfig');
const {validationResult } = require('express-validator');
const UsuarioForm = require('./Form/UsuarioForm');
const Usuario = require('../models/Usuario')

class UsuarioController {

    static routes(){
        return {
            auth: '/rest*',
            rest_by_organizacao_id: '/rest/usuario/org/:id',
            login: '/login',
            registro: '/registro'
        };
    }

    findByOrganizacaoId(){
        return (req, res) => {
            const id_organizacao = req.params.id;
            
            Usuario.findAll({
                where: {
                    id_organizacao: id_organizacao
                }
            })
            .then(usuarios => {
                res.status(200).json(usuarios);
            })
            .catch(erro => res.status(400).json({erro}));
        }
    }

    registrar(){
        return (req, res) => {
            const usuarioForm = new UsuarioForm(req.body);
            const erros = validationResult(req);

            if(! erros.isEmpty()){
                res.status(400).json(erros);
            }
            else {
                usuarioDAO.registrar(usuarioForm)
                .then(
                usuario => Usuario.build(usuario).save()
                .then(usuario => res.status(201).json({msg: "O usuário " + usuario.nome + " foi registrado com sucesso!"}))
                .catch(erro => res.status(400).json({erro})))
                .catch(erro => res.status(400).json({erro}));
            }
        }
    }

    doLogin(){
        return (req, res, next) => {
            passport.authenticate('login', {session: false}, (erro, usuario, info) => {
                if(info) {
                    console.log('info: ' + info);
                    return res.status(400).json(info);
                }
                if(erro) {
                    console.log(erro);
                    return res.status(500).json(erro);
                }
                
                req.login(usuario, (erro) => {
                    if(erro) {
                        return next(erro);
                    }
                    else {
                        const body = {
                            id: usuario.id,
                            idOrganizacao: usuario.id_organizacao,
                            nome: usuario.nome,
                            email: usuario.email
                        }
                        const token = jwt.sign({usuario: body}, jwtSecret.secret, {expiresIn: 3200});

                        return res.status(200).json(
                            {
                            token: token
                            }
                        );
                    }

                });
            })(req, res, next);
        
        }
    }

    home(){
        return (req, resp) => {
            resp.send('aaaa');
        }
    }
}

module.exports = UsuarioController;