const mongoose = require('mongoose');

const PontoSchema = mongoose.Schema({
    nome: String,
    obs: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Tipo', PontoSchema);