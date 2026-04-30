CREATE DATABASE drivecode;
USE drivecode;

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(80),
    senha VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE carro_usuario (
    id_carro_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_carro VARCHAR(45),
    cor VARCHAR(30) DEFAULT '00000000', -- ARMAZENA HEX DA COR
    nivel INT DEFAULT 1,
    xp INT DEFAULT 0,
    fk_usuario INT UNIQUE,
    CONSTRAINT fkCarroUsuario
        FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);
