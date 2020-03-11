const AlocacaoSalaController = require('../controllers/AlocacaoSalaController');
const alocacaoSalaController = new AlocacaoSalaController();
const passport  = require('passport');

module.exports = (app) => {
    const alocacaoRoutes = AlocacaoSalaController.routes();

    app.use(alocacaoRoutes.auth, passport.authenticate('jwt', { session : false }));

    app.get(alocacaoRoutes.rest_defaultFind, alocacaoSalaController.defaultFind());

    app.post(alocacaoRoutes.rest_add, alocacaoSalaController.criarAlocacao());
};