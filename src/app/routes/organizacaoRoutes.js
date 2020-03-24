const OrganizacaoController = require('../controllers/OrganizacaoController');
const organizacaoController = new OrganizacaoController();
const verifyJWT = require('../../config/auth-jwt');

module.exports = (app) => {
    const organizacaoRoutes = OrganizacaoController.routes();

    app.use(organizacaoRoutes.rest_organizacoes_id, verifyJWT);
    
    app.get(organizacaoRoutes.rest_organizacoes_id, organizacaoController.findById());

    app.get(organizacaoRoutes.rest_organizacoes_dominio, organizacaoController.findByDominio());
}