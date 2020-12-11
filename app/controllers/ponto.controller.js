const Ponto = require('../models/ponto.model.js');

const Tipo = require('../models/tipo.model.js');

// Grava Novo Ponto
exports.novo = (req, res) => {
    // Valida
    if (!req.body.lat || !req.body.lng || !req.body.tipo) {

        return res.status(400).send({
            message: "Posição é obrigatória"
        });
    }

    //Verifica Tipo (Extra Segurança) rs
    Tipo.findById(req.body.tipo)
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({
                    message: "Não encontrado o tipo id " + req.body.tipo
                });
            }

            // Salva Novo Ponto
            const ponto = new Ponto({
                tipo: req.body.tipo,
                lat: req.body.lat,
                lng: req.body.lng,
                obs: req.body.obs || ""
            });

            // Salvar Ponto
            ponto.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Erro ao Salvar a Posição."
                    });
                });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos o tipo id " + req.body.tipo
                });
            }
            return res.status(500).send({
                message: "Não carregou o tipo id " + req.body.tipo
            });
        });




};


// Busca por Id
exports.busca = (req, res) => {
    Ponto.findById(req.params.pontoId)
        .then(ponto => {
            if (!ponto) {
                return res.status(404).send({
                    message: "Não encontrado a posição id " + req.params.pontoId
                });
            }
            res.send(ponto);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos a posição id " + req.params.pontoId
                });
            }
            return res.status(500).send({
                message: "Não carregou a posição id " + req.params.pontoId
            });
        });
};

// Busca Todos Pontos Gravados.
exports.BuscaTodos = (req, res) => {
    Ponto.find()
        .then(pontos => {
            res.send(pontos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao Carregar as Posições."
            });
        });
};

// Atualiza o Ponto
exports.atualiza = (req, res) => {
    // Valida
    if (!req.body.lat || !req.body.lng || !req.body.tipo) {
        return res.status(400).send({
            message: "Posição é obrigatória"
        });
    }


    //Verifica Tipo (Extra Segurança) rs
    Tipo.findById(req.body.tipo)
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({
                    message: "Não encontrado o tipo id " + req.body.tipo
                });
            }

            // Busca Ponto e Atualiza
            Ponto.findByIdAndUpdate(req.params.pontoId, {
                    tipo: req.body.tipo,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    obs: req.body.obs || ""
                }, {
                    new: true
                })
                .then(ponto => {
                    if (!ponto) {
                        return res.status(404).send({
                            message: "Não encontrado a posição id " + req.params.pontoId
                        });
                    }
                    res.send(ponto);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Não encontramos a posição id " + req.params.pontoId
                        });
                    }
                    return res.status(500).send({
                        message: "Erro ao alterar a posição id  " + req.params.pontoId
                    });
                });


        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos o tipo id " + req.body.tipo
                });
            }
            return res.status(500).send({
                message: "Não carregou o tipo id " + req.body.tipo
            });
        });

};

// Apaga um ponto
exports.apaga = (req, res) => {
    Ponto.findByIdAndRemove(req.params.pontoId)
        .then(ponto => {
            if (!ponto) {
                return res.status(404).send({
                    message: "Não encontrado a posição id " + req.params.pontoId
                });
            }
            res.send({
                message: "Posição apagada!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Não encontramos a posição id " + req.params.pontoId
                });
            }
            return res.status(500).send({
                message: "Erro ao apagar a posição id " + req.params.pontoId
            });
        });
};

//Calcula Distancia
exports.distancia = (req, res) => {
    Ponto.findById(req.params.pontoId)
        .then(ponto => {
            if (!ponto) {
                return res.status(404).send({
                    message: "Não encontrado a posição id " + req.params.pontoId
                });
            }

            var latReq = parseFloat(req.query.lat);
            var lngReq = parseFloat(req.query.lng);

            if (isNaN(latReq) ||
                isNaN(lngReq)
            ) {

                console.log([req.query.lat, req.query.lng]);

                return res.status(404).send({
                    message: "Posição para Cálculo Inválida."
                });
            }

            var Distance = require('geo-distance');

            var DPonto = {
                lat: ponto.lat,
                lng: ponto.lng
            };
            var VPonto = {
                lat: req.query.lat,
                lng: req.query.lng
            };

            res.send({
                "distancia": Distance.between(DPonto, VPonto)
            });

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos a posição id " + req.params.pontoId
                });
            }
            return res.status(500).send({
                message: "Não carregou a posição id " + req.params.pontoId
            });
        });
};