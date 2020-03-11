const organizacaoRoutes = require('./organizacaoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const baseRoutes = require('./baseRoutes');
const salaRoutes = require('./salaRoutes');
const alocacaoRoutes = require('./alocacaoRoutes');

module.exports = (app) => {
    organizacaoRoutes(app);
    usuarioRoutes(app);
    baseRoutes(app);
    salaRoutes(app);
    alocacaoRoutes(app);
};