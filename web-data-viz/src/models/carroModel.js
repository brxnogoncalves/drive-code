var database = require("../database/config")

function listar() {
    console.log("ACESSEI O CARRO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT c.id_carro, c.nome as nome_carro, c.tipo as tipo_carro, m.nome as marca FROM carro c
        JOIN marca_carro m ON c.fk_marca = m.id_marca;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar
};