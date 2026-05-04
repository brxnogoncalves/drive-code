var gamesModel = require("../models/gamesModel");

function listarPerguntasQuiz(req, res) {
    var idGame = req.params.idGame;

    if (idGame == undefined) {
        res.status(400).send("idGame está undefined!");
    } else {
        gamesModel.listarPerguntasQuiz(idGame)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function adicionarXP(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idGame = req.body.idGameServer;
    let xpGanho = req.body.xpGanhoServer;

    if (idUsuario == undefined || xpGanho == undefined) {
        res.status(400).send("Dados inválidos!");
    } else {
        gamesModel.adicionarXP(idUsuario, idGame, xpGanho)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarComStatus(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else {
        gamesModel.listarComStatus(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarComStatus,
    listarPerguntasQuiz,
    adicionarXP
}