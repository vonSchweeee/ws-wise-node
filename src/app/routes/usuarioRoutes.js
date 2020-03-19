const Usuario = require('../models/Usuario');
const UsuarioController = require('../controllers/UsuarioController.js');
const usuarioController = new UsuarioController();
const passport = require('passport');
var cors = require('cors');
// const path = require('../views/home/login/login.marko');

module.exports = (app) => {
    const usuarioRoutes = UsuarioController.routes();

    

    app.use(usuarioRoutes.auth, passport.authenticate('jwt', { session : false }));

    app.get(usuarioRoutes.rest_by_organizacao_id, usuarioController.findByOrganizacaoId());

    app.get('/rest/verify-token', (req, res) => res.status(200).send('passou meu bom'));

    app.post(usuarioRoutes.registro, Usuario.validacoes(), usuarioController.registrar());

    app.route(usuarioRoutes.login)
        .post(usuarioController.doLogin());
        // .get(usuarioController.login());

    // app.post('/weblogin', usuarioController.webLogin());
};