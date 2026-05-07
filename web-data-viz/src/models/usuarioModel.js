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
            c.cor as cor_carro
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

function alterarModeloCarro(novoModelo, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL alterarCorCarro():", novoModelo, idUsuario);

    var instrucaoSql = `
        UPDATE carro_usuario SET modelo_carro = '${novoModelo}' WHERE fk_usuario = ${idUsuario}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function quantidadeGamesJogados(idUsuario) {
    var instrucaoSql = `
            SELECT COUNT(g.id_game) as qtd_games_jogados FROM game g WHERE EXISTS (
                    SELECT id_historico_xp FROM historico_xp hxcl
                    WHERE hx.fk_game = g.id_game AND hx.fk_usuario = ${idUsuario}
            );
        `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ranking(idUsuario) {
    var instrucaoSql = `
    SELECT * from (
        SELECT 
            fk_usuario,
            nome_carro,
            xp,
            ROW_NUMBER() OVER (ORDER BY ((nivel * 100) + xp) DESC) as posicao
            FROM carro_usuario) as ranking
    WHERE fk_usuario = ${idUsuario};
    `

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    logar,
    cadastrar,
    cadastrarCarroUsuario,
    alterarCorCarro,
    alterarModeloCarro,
    quantidadeGamesJogados,
    ranking
};