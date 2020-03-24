const Usuario = require('../models/Usuario');
const SalaController = require('../controllers/SalaController.js');
const salaController = new SalaController();
const verifyJWT = require('../../config/auth-jwt');

module.exports = (app) => {
    const salaRoutes = SalaController.routes();

    app.use(salaRoutes.auth, verifyJWT);

    app.get(salaRoutes.findByOrganizacaoId, salaController.findByOrganizacaoId());

}