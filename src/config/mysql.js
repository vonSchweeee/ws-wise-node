const mysql = require('mysql');

const sqlConn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'gerenciador_salas',
    timezone: '+3',
    dateStrings: false
});

module.exports = sqlConn;