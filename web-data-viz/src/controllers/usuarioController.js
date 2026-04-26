var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.logar(email, senha)
            .then(
                function(resultadoLogar) {
                    console.log(`\nResultados encontrados: ${resultadoLogar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoLogar)}`);

                    if (resultadoLogar.length == 1) {
                        console.log(resultadoLogar);
                        res.json({
                            id: resultadoLogar[0].id,
                            nome: resultadoLogar[0].nome,
                            email: resultadoLogar[0].email,
                        })
                    } else if (resultadoLogar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

// function cadastrar(req, res) {
//     let nome = req.body.nomeServer;
//     let email = req.body.emailServer;
//     let senha = req.body.senhaServer;
//     let dtNascimento = req.body.dtNascimentoServer;
//     let fkCarroPreferido = req.body.fkCarroPreferidoServer;

//     if (nome == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (dtNascimento == undefined) {
//         res.status(400).send("Sua data de nascimento está undefined!");
//     } else if (fkCarroPreferido == undefined) {
//         res.status(400).send("Seu carro preferido está undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nome, email, senha, dtNascimento, fkCarroPreferido)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    logar
}