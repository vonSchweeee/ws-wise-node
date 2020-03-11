const Usuario = require('../models/Usuario');
const UsuarioController = require('../controllers/UsuarioController.js');
const usuarioController = new UsuarioController();
const passport = require('passport');

module.exports = (app) => {
    const usuarioRoutes = UsuarioController.routes();

    app.use(usuarioRoutes.auth, passport.authenticate('jwt', { session : false }));

    app.get(usuarioRoutes.rest_by_organizacao_id, usuarioController.findByOrganizacaoId());

    app.post(usuarioRoutes.registro, Usuario.validacoes(), usuarioController.registrar());

    app.post(usuarioRoutes.login, usuarioController.doLogin());
}