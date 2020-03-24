const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const Organizacao = require('./Organizacao');
const {check} = require('express-validator');

const Model = Sequelize.Model;
class Usuario extends Model {
  static validacoes(){
    return [
        check('id_organizacao').isInt({min: 1}).withMessage('Organização inválida!'), 
        check('nome').isLength({ min: 3}).withMessage('Nome deve ter no mínimo 3 caracteres!'), 
        check('email').isEmail().withMessage('Formato de email inválido!'),
        check('senha').isLength({min: 3}).withMessage('Senha deve ter no mínimo 3 caracteres.')
    ]
}
}
Usuario.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_organizacao: {
    type: Sequelize.INTEGER,
    references: {
        model: Organizacao,
        key: 'id'
      }
  },
  nome: {
    type: Sequelize.STRING(120),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING(255),
    allowNull: false,
    set(senha){
      this.setDataValue('senha', senha);
    }
  },
  url_imagem: {
    type: Sequelize.STRING(300),
    allowNull: true
  }
}, {
  sequelize: sequelize,
  timestamps: false,
  modelName: 'usuario',
  tableName: 'usuario'
});

module.exports = Usuario;