const Tipo = require('../models/tipo.model.js');

// Grava Novo Tipo
exports.novo = (req, res) => {
    // Valida
    if (!req.body.nome) {
        return res.status(400).send({
            message: "Nome Tipo é Obrigatório"
        });
    }

    // Salva Novo Tipo
    const tipo = new Tipo({
        nome: req.body.nome,
        obs: req.body.obs || ""
    });

    // Salvar Tipo
    tipo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao Salvar Tipo."
            });
        });
};


// Busca por Id
exports.busca = (req, res) => {
    Tipo.findById(req.params.tipoId)
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({
                    message: "Não encontrado o tipo id " + req.params.tipoId
                });
            }
            res.send(tipo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos o tipo id " + req.params.tipoId
                });
            }
            return res.status(500).send({
                message: "Não carregou o tipo id " + req.params.tipoId
            });
        });
};

// Busca Todos Tipos Gravados.
exports.BuscaTodos = (req, res) => {
    Tipo.find()
        .then(tipos => {
            res.send(tipos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Erro ao os Tipos."
            });
        });
};

// Atualiza o Tipo
exports.atualiza = (req, res) => {
    // Valida
    if (!req.body.nome) {
        return res.status(400).send({
            message: "Nome Tipo é obrigatório"
        });
    }

    // Busca Tipo e Atualiza
    Tipo.findByIdAndUpdate(req.params.tipoId, {
            nome: req.body.nome,
            obs: req.body.obs || ""
        }, {
            new: true
        })
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({
                    message: "Não encontrado o tipo id " + req.params.tipoId
                });
            }
            res.send(tipo);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Não encontramos o tipo id " + req.params.tipoId
                });
            }
            return res.status(500).send({
                message: "Erro ao alterar o tipo id  " + req.params.tipoId
            });
        });
};

// Apaga um tipo
exports.apaga = (req, res) => {
    Tipo.findByIdAndRemove(req.params.tipoId)
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({
                    message: "Não encontrado o tipo id " + req.params.tipoId
                });
            }
            res.send({
                message: "Posição apagada!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Não encontramos o tipo id " + req.params.tipoId
                });
            }
            return res.status(500).send({
                message: "Erro ao apagar o tipo id " + req.params.tipoId
            });
        });
};