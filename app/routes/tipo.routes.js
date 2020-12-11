module.exports = (app) => {
    const tipos = require('../controllers/tipo.controller.js');

    // Grava novo Tipo
    app.post('/tipos', tipos.novo);

    // Carrega todos os tipos
    app.get('/tipos', tipos.BuscaTodos);

    // Carrega única posição
    app.get('/tipos/:tipoId', tipos.busca);

    // Altera único tipo
    app.put('/tipos/:tipoId', tipos.atualiza);

    // Apaga um tipo
    app.delete('/tipos/:tipoId', tipos.apaga);
}