const AlocacaoSala = require('../../models/AlocacaoSala');
const { Op } = require('sequelize');
const moment = require('moment');

class AlocacaoSalaDAO {
    queries(){
        return {
            findBySalaIdAndDataHoraInicio: `SELECT * FROM alocacao_sala WHERE id_sala = ? AND data_hora_inicio >= ? AND data_hora_inicio < ? AND ativo = true ORDER BY data_hora_inicio ASC`
        };
    }

    findBySalaIdAndDataHoraInicio(id_sala, data_hora_inicio){
        return new Promise((resolve, reject) => {
            const data_hora_fim = moment(data_hora_inicio).add(1, 'days').format('YYYY-MM-DD');
            AlocacaoSala.findAll({where: {
                id_sala: id_sala,
                [Op.and] : [
                    {
                        data_hora_inicio: {
                            [Op.gte]: data_hora_inicio  
                        }
                    },
                    {
                        data_hora_inicio: {
                            [Op.lt]: data_hora_fim
                        }
                    },
                    {ativo: true}
                ]
            },
            order: ['data_hora_inicio']
            })
            .then(alocacoes => resolve(alocacoes))
            .catch(erro => reject(erro));
            });
    }

    criarAlocacao(alocacao){
        return new Promise((resolve, reject) => {
            const alocacaoBuild = AlocacaoSala.build(alocacao);
            console.log(alocacaoBuild);
            alocacaoBuild.save()
            .then(res => {
                console.log(res);
                resolve('Alocação realizada com sucesso!');
            })
            .catch(erro => { 
                console.log(erro)
                reject(erro);
            });
        });
    }

    verificarConsistencia(id_sala, data_hora_inicio, data_hora_fim){
        return new Promise((resolve, reject) => {
            AlocacaoSala.findAll({where: {
                id_sala: id_sala,
                [Op.and] : [
                    {
                        data_hora_inicio: {
                            [Op.between]: [data_hora_inicio, data_hora_fim]  
                        }
                    },
                    {
                        data_hora_fim: {
                            [Op.between]: [data_hora_inicio, data_hora_fim]  
                        }
                    },
                    {ativo: true}
                ]
            },
            order: ['data_hora_inicio']
            })
            .then(alocacoes => resolve(alocacoes))
            .catch(erro => reject(erro));
            });
    }
}
module.exports = AlocacaoSalaDAO;