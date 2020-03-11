const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const Sala = require('./Sala');
const Usuario = require('./Usuario');

const Model = Sequelize.Model;
class AlocacaoSala extends Model {}
AlocacaoSala.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_sala: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Sala,
        key: 'id'
      }
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Usuario,
        key: 'id'
      }
  },
  data_hora_inicio: {
    type: Sequelize.DATE,
    allowNull: false
  },
  data_hora_fim: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(45),
    allowNull: false
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  data_criacao: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  data_alteracao: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  }
}, {
  sequelize,
  modelName: 'alocacao_sala',
  tableName: 'alocacao_sala',
  timestamps: false
});

module.exports = AlocacaoSala;