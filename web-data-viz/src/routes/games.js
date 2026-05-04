var express = require("express");
var router = express.Router();

var gamesController = require("../controllers/gamesController");

router.get("/quiz/perguntas/:idGame", function (req, res) {
    gamesController.listarPerguntasQuiz(req, res);
})

router.post("/adicionarXP", function (req, res) {
    gamesController.adicionarXP(req, res);
}) 

module.exports = router;