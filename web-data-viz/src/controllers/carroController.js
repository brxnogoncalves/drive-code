var carroModel = require("../models/carroModel");

function listar(req, res) {
    carroModel.listar()
        .then(
            function (resultadoListar) {
                console.log(`\nResultados encontrados: ${resultadoListar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoListar)}`);

                res.json(resultadoListar);
            }
        )
}

module.exports = {
    listar
}