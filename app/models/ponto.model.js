const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const PontoSchema = mongoose.Schema({
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "Tipo"
    },
    lat: Number,
    lng: Number,
    obs: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Ponto', PontoSchema);