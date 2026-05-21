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

router.post("/alterarTexturaCarro", function (req, res) {
    usuarioController.alterarTexturaCarro(req, res);
})

router.get("/quantidadeGamesJogados/:idUsuario", function(req,res) {
    usuarioController.quantidadeGamesJogados(req, res);
})

router.get("/ranking/:idUsuario?", function (req, res) {
    usuarioController.ranking(req, res);
})

router.get("/desempenhoPorTema/:idUsuario", function(req, res) {
    usuarioController.desempenhoPorTema(req, res);
});

router.get("/feedXp", function (req, res) {
    usuarioController.buscarFeedXP(req, res);
});

router.get("/tempoResposta/:idUsuario", function (req, res) {
    usuarioController.buscarTempoResposta(req, res);
});

router.get("/loja/:idUsuario", function (req, res) {
    usuarioController.buscarItensLoja(req, res);
});

router.post("/liberarItem", function (req, res) {
    usuarioController.liberarItem(req, res);
});

router.get("/garagem/:idUsuario", function (req, res) {
    usuarioController.buscarItensGaragem(req, res);
});

module.exports = router;