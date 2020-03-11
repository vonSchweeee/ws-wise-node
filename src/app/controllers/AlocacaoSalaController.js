const AlocacaoSalaDAO = require('./DAO/AlocacaoSalaDAO');
const alocacaoSalaDAO = new AlocacaoSalaDAO();

class AlocacaoSalaController{
    static routes(){
        return {
            auth: '/rest*',
            rest_defaultFind: '/rest/alocacao/find',
            rest_add: '/rest/alocacao/add'
        };
    }
    defaultFind(){
        return (req, res) => {
            const id_sala = req.body.id_sala;
            const data_hora_inicio = req.body.data_hora_inicio;

            alocacaoSalaDAO.findBySalaIdAndDataHoraInicio(id_sala, data_hora_inicio)
            .then(alocacoes => res.status(200).json(alocacoes))
            .catch(erro => res.status(200).json({erro}));
        }
    }

    criarAlocacao(){
        return (req, res) => {
            const alocacao = req.body;

            alocacaoSalaDAO.criarAlocacao(alocacao)
            .then(result => res.status(201).json(result))
            .catch(erro => res.status(400).json(erro));
        }
    }
}
module.exports = AlocacaoSalaController;