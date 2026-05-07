var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/alterarCorCarro", function (req, res) {
    usuarioController.alterarCorCarro(req, res);
})

router.get("/quantidadeGamesJogados/:idUsuario", function(req,res) {
    usuarioController.quantidadeGamesJogados(req, res);
})

router.get("/ranking/:idUsuario", function (req, res) {
    usuarioController.ranking(req, res);
})

module.exports = router;