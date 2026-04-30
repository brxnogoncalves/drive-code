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

module.exports = {
    logar,
    cadastrar,
    cadastrarCarroUsuario
};