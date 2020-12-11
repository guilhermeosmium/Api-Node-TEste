const express = require('express');
const bodyParser = require('body-parser');

// novo app express
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))

//  application/json
app.use(bodyParser.json())

// Configurando Mongo
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Conecta Mongo
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB - Conectado");
}).catch(err => {
    console.log('Não contectou MongoDB. Desconectando...', err);
    process.exit();
});

// rota padrão
app.get('/', (req, res) => {
    res.json({
        "message": "Bem vindo! Teste Rodando."
    });
});

//carrega as rotas
require('./app/routes/ponto.routes.js')(app);
require('./app/routes/tipo.routes.js')(app);

// Porta 3000
app.listen(3000, () => {
    console.log("Servidor Rodando na porta 3000");
});