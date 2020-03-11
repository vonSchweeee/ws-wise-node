const Usuario = require('../models/Usuario');
const SalaController = require('../controllers/SalaController.js');
const salaController = new SalaController();
const passport = require('passport');

module.exports = (app) => {
    const salaRoutes = SalaController.routes();

    app.use(salaRoutes.auth, passport.authenticate('jwt', { session : false }));

    app.get(salaRoutes.findByOrganizacaoId, salaController.findByOrganizacaoId());

}