CREATE DATABASE drivecode;
USE drivecode;

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(80) UNIQUE,
    senha VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE carro_usuario (
    id_carro_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_carro VARCHAR(45),
    cor CHAR(7) DEFAULT '#000000', -- ARMAZENA HEX DA COR
    nivel INT DEFAULT 1,
    xp INT DEFAULT 0,
    fk_usuario INT UNIQUE,
    CONSTRAINT fkCarroUsuario
        FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE game (
	id_game INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60),
    descricao VARCHAR(255),
    xp_recompensa INT
);

CREATE TABLE historico_xp (
	id_historico_xp INT PRIMARY KEY AUTO_INCREMENT,
    xp_ganho INT,
    data_ganho DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_usuario INT,
    fk_game INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_game) REFERENCES game(id_game)
);