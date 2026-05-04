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

module.exports = {
    listarPerguntasQuiz
}