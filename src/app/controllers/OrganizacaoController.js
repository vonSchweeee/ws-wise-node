const OrganizacaoDAO = require('./DAO/OrganizacaoDAO');
const organizacaoDAO = new OrganizacaoDAO();
class OrganizacaoController {

    static routes(){
        return {
            auth: '/rest*',
            rest_organizacoes: '/rest/organizacoes/',
            rest_organizacoes_dominio: '/rest/organizacoes/dominio',
            rest_organizacoes_id: '/rest/organizacoes/id/:id' 
        };
    }

    findById(){
        return (req, res) => {
            const id = req.params.id;

            organizacaoDAO.findById(id)
            .then(organizacoes => res.status(200).json(organizacoes))
            .catch(erro => res.status(400).json(erro));
        };
    }

    findByDominio(){
        return (req, res) => {
            const dominio = req.query.dominio;
            
            organizacaoDAO.findByDominio(dominio)
            .then(organizacoes => { 
                res.status(200).json(organizacoes)
                console.log(res)})
            .catch(erro => { res.status(400).json(erro)
            console.log(erro)});
        };
    }
}
module.exports = OrganizacaoController;