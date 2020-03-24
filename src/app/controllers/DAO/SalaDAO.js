const Sala = require('../../models/Sala')

class SalaDAO {
    queries(){
        return {
            findByOrganizacaoId: 'SELECT * FROM sala WHERE id_organizacao = ?'
        };
    }

    findByOrganizacaoId(id_organizacao){
        return new Promise((resolve, reject) => {

            Sala.findAll({
                attributes: { exclude: ['area_sala', 'localizacao', 'longitude'] },
                where: {id_organizacao: id_organizacao}
            }).then(salas => { 
                if(salas[0] == null){
                    reject('Nenhuma sala encontrada para a organização fornecida.');
                }
                    resolve(resultado);
            }).catch(erro => reject(erro)); 
        });
    }
}
module.exports = SalaDAO;