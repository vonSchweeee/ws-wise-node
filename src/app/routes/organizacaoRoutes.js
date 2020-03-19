const OrganizacaoController = require('../controllers/OrganizacaoController');
const organizacaoController = new OrganizacaoController();
const passport = require('passport');

module.exports = (app) => {
    const organizacaoRoutes = OrganizacaoController.routes();

    app.use(organizacaoRoutes.rest_organizacoes_id, passport.authenticate('jwt', { session : false }));
    
    app.get(organizacaoRoutes.rest_organizacoes_id, organizacaoController.findById());

    app.get(organizacaoRoutes.rest_organizacoes_dominio, organizacaoController.findByDominio());
}