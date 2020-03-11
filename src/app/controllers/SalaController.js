const SalaDAO = require('./DAO/SalaDAO');
const salaDAO = new SalaDAO;

class SalaController{
    static routes(){
        return {
            auth: '/rest*',
            findByOrganizacaoId: '/rest/sala/org/:id'
        };
    }
    findByOrganizacaoId () {
        return (req, res) => {
            const id_organizacao = req.params.id;

            salaDAO.findByOrganizacaoId(id_organizacao)
            .then(salas => res.status(200).json(salas))
            .catch(erro => res.status(400).json({erro}));

        };
    }
}
module.exports = SalaController;