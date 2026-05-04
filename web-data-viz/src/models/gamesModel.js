var database = require("../database/config")

function listarPerguntasQuiz(idGame) {
    console.log("ACESSEI O GAME MODEL listarPerguntasQuiz():", idGame);

    var instrucaoSql = `
        SELECT 
            id_pergunta,
            pergunta,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            alternativa_correta,
            tema
        FROM pergunta_quiz
        WHERE fk_game = ${idGame};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPerguntasQuiz
};