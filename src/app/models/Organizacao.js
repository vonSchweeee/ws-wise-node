const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Model = Sequelize.Model;
class Organizacao extends Model {}
Organizacao.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    get() {
        return this.getDataValue('id');
    }
  },
  nome: {
    type: Sequelize.STRING(80),
    allowNull: false,
    get() {
        return this.getDataValue('nome');
    }
  },
  id_organizacao_pai: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Organizacao,
        key: 'id'
    },
    get() {
        return this.getDataValue('id_organizacao_pai');
    }
  },
  tipo_organizacao: {
    type: Sequelize.CHAR(1),
    defaultValue: 'M',
    allowNull: false
  },
  dominio: {
    type: Sequelize.STRING(64),
    allowNull: false,
    get() {
        return this.getDataValue('dominio');
    }
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
  cep: {
    type: Sequelize.CHAR(9),
    get() {
        return this.getDataValue('cep');
    }
  }
}, {
  sequelize: sequelize,
  modelName: 'organizacao',
  tableName: 'organizacao'
});

module.exports = Organizacao;