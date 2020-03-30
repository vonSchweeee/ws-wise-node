const AlocacaoSalaDAO = require('./DAO/AlocacaoSalaDAO');
const alocacaoSalaDAO = new AlocacaoSalaDAO();

class AlocacaoSalaController{
    static routes(){
        return {
            auth: '/rest*',
            rest_defaultFind: '/rest/alocacao/find',
            rest_crud: '/rest/alocacao',
        };
    }
    defaultFind(){
        return (req, res) => {
            const id_sala = req.query.idSala;
            const data_hora_inicio = req.query.diaEscolhido;
            alocacaoSalaDAO.findBySalaIdAndDataHoraInicio(id_sala, data_hora_inicio)
            .then(alocacoes => res.status(200).json(alocacoes))
            .catch(erro => res.status(200).json(erro));
        }
    }

    criarAlocacao(){
        return (req, res) => {
            const alocacao = req.body;

            alocacaoSalaDAO.verificarConsistencia(alocacao.id_sala, alocacao.data_hora_inicio, alocacao.data_hora_fim)
            .then(result => {
                alocacaoSalaDAO.criarAlocacao(alocacao)
                .then(msg => res.status(201).json({msg}))
                .catch(erro => console.log(erro))
            }
            ).catch(erro => res.status(400).json({erro}));
        }
    }

    alterarAlocacao(){
        return (req, res) => {
            const novaAlocacao = req.body;

            alocacaoSalaDAO.alterarAlocacao(novaAlocacao)
            .then(msg => res.status(200).json({msg}))
            .catch(erro => res.status(400).json({erro}));
        };
    }

    desativarAlocacao(){
        return (req, res) => {
            const id = req.body.id;
            console.log(req.body);
            alocacaoSalaDAO.desativarAlocacao(id)
            .then(msg => res.status(200).json({msg}))
            .catch(erro => res.status(400).json({erro}));
        };
    }
}
module.exports = AlocacaoSalaController;