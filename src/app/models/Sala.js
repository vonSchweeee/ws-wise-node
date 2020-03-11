const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const Organizacao = require('./Organizacao');

const Model = Sequelize.Model;
class Sala extends Model {}
Sala.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_organizacao: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Organizacao,
        key: 'id'
      }
  },
  nome: {
    type: Sequelize.STRING(80),
    allowNull: false
  },
  lugares_disponiveis: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  possui_multimidia: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  possui_ac: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  area_sala: {
    type: Sequelize.DECIMAL(9,2),
    allowNull: true
  },
  localizacao: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  latitude: {
    type: Sequelize.DOUBLE
  },
  longitude: {
    type: Sequelize.DOUBLE
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
  },
  url_imagem: {
    type: Sequelize.STRING(300),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'sala',
  tableName: 'sala',
  timestamps: false
});

module.exports = Sala;