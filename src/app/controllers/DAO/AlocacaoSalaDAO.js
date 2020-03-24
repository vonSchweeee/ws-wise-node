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
            AlocacaoSala.findOne({where: {
                id_sala: id_sala,
                [Op.or] : [
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
                ],
                ativo: true
            },
            order: ['data_hora_inicio']
            })
            .then(alocacao => { 
                if(alocacao == null){
                    console.log(alocacao);
                    resolve();
                }else {
                    reject('Alocação conflita em horário com outra alocação!');
                }
            })
            .catch(erro => {reject(erro)
            console.log('js foda bisho...') });
            });
    }

    alterarAlocacao(novaAlocacao){
        return new Promise((resolve, reject) => {
            AlocacaoSala.update(novaAlocacao, {where: {id: novaAlocacao.id}})
            .then(linhas => {
                console.log(linhas);
                if(linhas > 0 )
                    resolve('Alocação alterada com sucesso!')
                reject('Nenhuma alocação com o id informado encontrada!')
            })
            .catch(erro => {
                reject(erro);
            });
        });
    }

    desativarAlocacao(id){
        return new Promise((resolve, reject) => {
            AlocacaoSala.update({ativo: false}, {where: {id: id}})
            .then(linhas => {
                if(linhas > 0){
                    return resolve('Alocação desativada com sucesso!');
                }
                reject('Nenhuma alocação ativa com o id informado encontrado!');
            })
            .catch(erro => reject(erro));
        });
    }
}
module.exports = AlocacaoSalaDAO;