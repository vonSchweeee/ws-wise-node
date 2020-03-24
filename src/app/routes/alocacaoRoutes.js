const AlocacaoSalaController = require('../controllers/AlocacaoSalaController');
const alocacaoSalaController = new AlocacaoSalaController();
const verifyJWT = require('../../config/auth-jwt');

module.exports = (app) => {
    const alocacaoRoutes = AlocacaoSalaController.routes();

    app.use(alocacaoRoutes.auth, verifyJWT);

    app.route(alocacaoRoutes.rest_crud)
        .get(alocacaoSalaController.defaultFind())
        .post(alocacaoSalaController.criarAlocacao())
        .put(alocacaoSalaController.alterarAlocacao())
        .delete(alocacaoSalaController.desativarAlocacao());

};