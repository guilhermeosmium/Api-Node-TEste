module.exports = (app) => {
    const pontos = require('../controllers/ponto.controller.js');

    // Grava nova posicao
    app.post('/pontos', pontos.novo);

    // Carrega todos os pontos
    app.get('/pontos', pontos.BuscaTodos);

    // Calcula Distancia de um Ponto
    app.get('/pontos/distancia/:pontoId', pontos.distancia);

    // Carrega única posição
    app.get('/pontos/:pontoId', pontos.busca);

    // Altera único ponto
    app.put('/pontos/:pontoId', pontos.atualiza);

    // Apaga um ponto
    app.delete('/pontos/:pontoId', pontos.apaga);
}