const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

const auth = require('../config/auth');
auth(app);

const routes = require('../app/routes/routes');
routes(app);

// PARA A PARTE WEB
app.use((req, resp, next) => {
    return resp.status(404).send('não encontrado');
});
  
app.use(function (erro, req, resp, next) {
    console.log(erro);
    return resp.status(500).send('erro');
});

module.exports = app;