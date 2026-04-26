var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

module.exports = router;