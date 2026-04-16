var express = require("express");
var router = express.Router();

var carroController = require("../controllers/carroController");

router.get("/listar", function (req, res) {
    carroController.listar(req, res);
});

module.exports = router;