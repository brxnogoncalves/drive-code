var database = require("../database/config")

function logar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT 
            u.id_usuario AS id,
            u.nome,
            u.email,
            c.id_carro_usuario,
            c.nome_carro,
            c.nivel,
            c.xp,
            c.cor as cor_carro,
            c.textura_carro
        FROM usuario u
        JOIN carro_usuario c 
            ON c.fk_usuario = u.id_usuario
        WHERE u.email = '${email}' 
          AND u.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, dtNascimento, fkCarroPreferido) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, dtNascimento, fkCarroPreferido);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, data_nascimento) 
        VALUES ('${nome}', '${email}', '${senha}', '${dtNascimento}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function cadastrarCarroUsuario(nomeCarro, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL cadastrarCarroUsuario():", nomeCarro, fkUsuario);

    var instrucaoSql = `
        INSERT INTO carro_usuario (nome_carro, fk_usuario)
        VALUES ('${nomeCarro}', ${fkUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarCorCarro(novaCor, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL alterarCorCarro():", novaCor, idUsuario);

    var instrucaoSql = `
        UPDATE carro_usuario SET cor = '${novaCor}' WHERE fk_usuario = ${idUsuario}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function alterarModeloCarro(novoModelo, idUsuario) {
//     console.log("ACESSEI O USUARIO MODEL alterarCorCarro():", novoModelo, idUsuario);

//     var instrucaoSql = `
//         UPDATE carro_usuario SET modelo_carro = '${novoModelo}' WHERE fk_usuario = ${idUsuario}
//     `

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function alterarTexturaCarro(novaTextura, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL alterarTextura():", novaTextura, idUsuario);

    var instrucaoSql = `
        UPDATE carro_usuario SET textura_carro = '${novaTextura}' WHERE fk_usuario = ${idUsuario}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function quantidadeGamesJogados(idUsuario) {
    var instrucaoSql = `
            SELECT COUNT(g.id_game) as qtd_games_jogados FROM game g WHERE EXISTS (
                    SELECT id_historico_xp FROM historico_xp hx
                    WHERE hx.fk_game = g.id_game AND hx.fk_usuario = ${idUsuario}
            );
        `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ranking() {
    let instrucaoSql = `
            SELECT 
                c.fk_usuario,
                u.nome as nome_usuario,
                c.nome_carro,
                c.nivel,
                c.xp
            FROM carro_usuario c
            JOIN usuario u ON c.fk_usuario = u.id_usuario
            ORDER BY ((c.nivel * 100) + c.xp) DESC;
        `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desempenhoPorTema(idUsuario) {

    var instrucaoSql = `
        SELECT 
            pq.tema,
            ROUND(AVG(rq.acertou) * 100, 2) AS taxa_acerto
        FROM pergunta_quiz pq

        LEFT JOIN resposta_quiz rq 
            ON rq.fk_pergunta = pq.id_pergunta
            AND rq.fk_usuario = ${idUsuario}

        GROUP BY pq.tema;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarFeedXP() {
    var instrucaoSql = `
        SELECT 
            h.id_historico_xp,
            h.xp_ganho,
            h.data_ganho,
            u.nome AS nome_usuario,
            c.nome_carro,
            g.nome AS nome_game
        FROM historico_xp h
        JOIN usuario u
            ON h.fk_usuario = u.id_usuario
        JOIN carro_usuario c
            ON c.fk_usuario = u.id_usuario
        JOIN game g
            ON h.fk_game = g.id_game
        ORDER BY h.data_ganho DESC
        LIMIT 8;
    `;

    return database.executar(instrucaoSql);
}

function buscarTempoResposta(idUsuario) {
    var instrucaoSql = `
        SELECT 
            g.nome AS nome_game,
            
            ROW_NUMBER() OVER (
                PARTITION BY g.id_game
                ORDER BY p.id_pergunta
            ) AS numero_pergunta,

            p.id_pergunta,
            p.pergunta,
            r.tempo_resposta,
            r.acertou,
            r.data_resposta

        FROM resposta_quiz r

        JOIN pergunta_quiz p
            ON r.fk_pergunta = p.id_pergunta

        JOIN game g
            ON p.fk_game = g.id_game

        WHERE r.fk_usuario = ${idUsuario}

        ORDER BY g.id_game, p.id_pergunta;
    `;

    return database.executar(instrucaoSql);
}

function buscarItensLoja(idUsuario) {
    var instrucaoSql = `
        SELECT 
            i.id_item,
            i.nome,
            i.tipo,
            i.valor,
            i.descricao,
            i.xp_minimo,

            CASE WHEN ui.id_usuario_item IS NOT NULL THEN 1
            ELSE 0
            END AS adquirido,

            CASE WHEN ((c.nivel * 100) + c.xp) >= i.xp_minimo THEN 1
            ELSE 0
            END AS desbloqueado,

            ((c.nivel * 100) + c.xp) AS xp_total

        FROM item_customizacao i

        JOIN carro_usuario c
            ON c.fk_usuario = ${idUsuario}

        LEFT JOIN usuario_item ui
            ON ui.fk_item = i.id_item
            AND ui.fk_usuario = ${idUsuario}

        ORDER BY i.xp_minimo ASC;
    `;

    return database.executar(instrucaoSql);
}

function liberarItem(idUsuario, idItem) {
    var instrucaoSql = `
        INSERT INTO usuario_item (fk_usuario, fk_item)
        VALUES (${idUsuario}, ${idItem});
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function buscarItensGaragem(idUsuario) {
    var instrucaoSql = `
        SELECT 
            i.id_item,
            i.nome,
            i.tipo,
            i.valor,
            i.descricao
        FROM usuario_item ui
        JOIN item_customizacao i
            ON ui.fk_item = i.id_item
        WHERE ui.fk_usuario = ${idUsuario}
        ORDER BY i.id_item;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


module.exports = {
    logar,
    cadastrar,
    cadastrarCarroUsuario,
    alterarCorCarro,
    alterarTexturaCarro,
    quantidadeGamesJogados,
    ranking,
    desempenhoPorTema,
    buscarFeedXP,
    buscarTempoResposta,
    buscarItensLoja,
    liberarItem,
    buscarItensGaragem,
};