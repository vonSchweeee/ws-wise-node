const AlocacaoSalaController = require('../controllers/AlocacaoSalaController');
const alocacaoSalaController = new AlocacaoSalaController();
const passport  = require('passport');

module.exports = (app) => {
    const alocacaoRoutes = AlocacaoSalaController.routes();

    app.use(alocacaoRoutes.auth, passport.authenticate('jwt', { session : false }));

    app.route(alocacaoRoutes.rest_crud)
        .get(alocacaoSalaController.defaultFind())
        .post(alocacaoSalaController.criarAlocacao())
        .put(alocacaoSalaController.alterarAlocacao())
        .delete(alocacaoSalaController.desativarAlocacao());

};