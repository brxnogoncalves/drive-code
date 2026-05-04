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

function adicionarXP(idUsuario, idGame, xpGanho) {
    console.log("Adicionando XP:", idUsuario, xpGanho);

    // ADICIONA XP AO CARRO
    let instrucao1 = `
        UPDATE carro_usuario 
        SET xp = xp + ${xpGanho}
        WHERE fk_usuario = ${idUsuario};
    `;

    // SALVA HISTORICO DO GAME 
    let instrucao2 = `
        INSERT INTO historico_xp (xp_ganho, fk_usuario, fk_game)
        VALUES (${xpGanho}, ${idUsuario}, ${idGame});
    `;

    // SELECIONA XP ATUALIZADO
    var instrucao3 = `
        SELECT xp, nivel 
        FROM carro_usuario 
        WHERE fk_usuario = ${idUsuario};
    `;

    return database.executar(instrucao1)
        .then(() => database.executar(instrucao2))
        .then(() => database.executar(instrucao3))
        .then(resultado => {
            // faz level up se necessário
            
            let xp = resultado[0].xp;
            let nivel = resultado[0].nivel;

            if (xp >= 100) {
                let novoNivel = nivel + 1;
                let novoXP = xp - 100;

                let instrucao4 = `
                    UPDATE carro_usuario
                    SET nivel = ${novoNivel}, xp = ${novoXP}
                    WHERE fk_usuario = ${idUsuario};
                `;

                return database.executar(instrucao4).then(() => {
                    return { xp: novoXP, nivel: novoNivel };
                });
            }

            return { xp: xp, nivel: nivel };
        })
}

module.exports = {
    listarPerguntasQuiz,
    adicionarXP
};