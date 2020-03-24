const organizacaoRoutes = require('./organizacaoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const salaRoutes = require('./salaRoutes');
const alocacaoRoutes = require('./alocacaoRoutes');

module.exports = (app) => {
    organizacaoRoutes(app);
    usuarioRoutes(app);
    salaRoutes(app);
    alocacaoRoutes(app);
};