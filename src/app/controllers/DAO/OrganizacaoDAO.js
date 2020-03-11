const Organizacao = require('../../models/Organizacao');

class OrganizacaoDAO {
    queries(){
        return {
            findById: 'SELECT * FROM organizacao WHERE id = ?',
            findByDominio: 'SELECT * FROM organizacao WHERE dominio = ?'
        };
    }

    findById(id){
        return new Promise((resolve, reject) => {
            Organizacao.findOne({where: {id: id}})
            .then(organizacoes => resolve(organizacoes))
            .catch(erro => reject(erro));
        });
    }

    findByDominio(dominio){
        return new Promise((resolve, reject) => {
            Organizacao.findAll({where: {dominio: dominio}})
            .then(organizacoes => resolve(organizacoes))
            .catch(erro => reject(erro));
        });
    }

}
module.exports = OrganizacaoDAO;