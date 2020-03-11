const app = require('./src/config/custom-express');
const sqlConn = require('./src/config/mysql');


sqlConn.connect((erro) => {
    if (erro){
        console.log(erro);
    }
    else{
        console.log('Conexão com o banco de dados realizada com sucesso.');
        app.listen(3000, () => console.log("Servidor rodando na porta 3000")); 
    }
});


