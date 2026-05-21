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
                function (resultadoLogar) {
                    console.log(`\nResultados encontrados: ${resultadoLogar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoLogar)}`);

                    if (resultadoLogar.length == 1) {
                        console.log(resultadoLogar);
                        res.json({
                            id: resultadoLogar[0].id,
                            nome: resultadoLogar[0].nome,
                            email: resultadoLogar[0].email,
                            nome_carro: resultadoLogar[0].nome_carro,
                            nivel_carro: resultadoLogar[0].nivel,
                            xp_carro: resultadoLogar[0].xp,
                            cor_carro: resultadoLogar[0].cor_carro,
                            textura_carro: resultadoLogar[0].textura_carro
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

function cadastrar(req, res) {
    let nome = req.body.nomeServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let dtNascimento = req.body.dtNascimentoServer;
    let nomeCarro = req.body.nomeCarroServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (nomeCarro == undefined) {
        res.status(400).send("Seu carro está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha, dtNascimento, nomeCarro)
            .then(function (resultado) {
                let idUsuario = resultado.insertId;
                return usuarioModel.cadastrarCarroUsuario(nomeCarro, idUsuario);
            })
            .then(function (resultadoCarro) {
                res.json({
                    mensagem: "Usuário e carro cadastrados com sucesso!",
                    carro: resultadoCarro
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarCorCarro(req, res) {
    let novaCor = req.body.novaCorServer;
    let idUsuario = req.body.idUsuarioServer;

    if (novaCor == undefined) {
        res.status(400).send("Nova cor está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Id usuário está undefined!");
    }
    else {
        usuarioModel.alterarCorCarro(novaCor, idUsuario)
            .then(function (resultado) {
                res.json({
                    mensagem: "Cor alterada com sucesso!",
                    novaCor: novaCor
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a alteração da cor! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterarTexturaCarro(req, res) {
    let novaTextura = req.body.novaTexturaServer;
    let idUsuario = req.body.idUsuarioServer;

    if (novaTextura == undefined) {
        res.status(400).send("Nova textura está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Id usuário está undefined!");
    }
    else {
        usuarioModel.alterarTexturaCarro(novaTextura, idUsuario)
            .then(function (resultado) {
                res.json({
                    mensagem: "Textura alterada com sucesso!",
                    novaTextura: novaTextura
                });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a alteração da textura! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function quantidadeGamesJogados(req, res) {
    let idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else {
        usuarioModel.quantidadeGamesJogados(idUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function ranking(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.ranking(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function desempenhoPorTema(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.desempenhoPorTema(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function buscarFeedXP(req, res) {
    usuarioModel.buscarFeedXP()
        .then((resultado) => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar feed de XP:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarTempoResposta(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.buscarTempoResposta(idUsuario)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar tempo de resposta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarItensLoja(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.buscarItensLoja(idUsuario)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar itens da loja:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function liberarItem(req, res) {
    let idUsuario = req.body.idUsuarioServer;
    let idItem = req.body.idItemServer;

    usuarioModel.liberarItem(idUsuario, idItem)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao liberar item:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarItensGaragem(req, res) {
    let idUsuario = req.params.idUsuario;

    usuarioModel.buscarItensGaragem(idUsuario)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar itens da garagem:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    logar,
    cadastrar,
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
}