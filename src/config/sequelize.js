const Sequelize = require('sequelize');
const moment = require('moment');

const sequelize = new Sequelize('gerenciador_salas', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    underscored: true,
    freezeTableName: true, //use singular table name
    timestamps: false,  // I do not want timestamp fields by default
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) { // for reading from database
      if (field.type === 'DATETIME' || field.type == 'TIMESTAMP') {
        const data = field.string();
        return moment(data).subtract(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
      }
        return next()
      },
  }
});

module.exports = sequelize;
