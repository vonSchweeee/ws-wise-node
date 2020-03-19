const express = require('express');
const app = require('./src/config/custom-express');

app.listen(3001, () => { 
    console.log("Servidor rodando na porta 3001");
    console.log('CORS ativado.');
}); 

const auth = require('./src/config/auth');
auth(app);

const routes = require('./src/app/routes/routes');
routes(app);

app.use(express.static('src/app/public')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/


// PARA A PARTE WEB
app.use((req, resp, next) => {
    return resp.status(404).send('não encontrado');
});
  
app.use(function (erro, req, resp, next) {
    console.log(erro);
    return resp.status(500).send('erro');
});


