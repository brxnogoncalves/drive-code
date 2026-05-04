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
    CONSTRAINT fkCarroUsuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
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
    CONSTRAINT fkHistoricoUsuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fkHistoricoGame FOREIGN KEY (fk_game) REFERENCES game(id_game)
);

CREATE TABLE pergunta_quiz (
    id_pergunta INT PRIMARY KEY AUTO_INCREMENT,
    pergunta VARCHAR(255),
    alternativa_a VARCHAR(255),
    alternativa_b VARCHAR(255),
    alternativa_c VARCHAR(255),
    alternativa_d VARCHAR(255),
    alternativa_correta CHAR(1),
    tema VARCHAR(45),
    fk_game INT,
    CONSTRAINT fkPerguntaGame FOREIGN KEY (fk_game) REFERENCES game(id_game)
);

CREATE TABLE resposta_quiz (
    id_resposta INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    fk_pergunta INT,
    acertou TINYINT,
    tempo_resposta INT,
    data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkRespostaUsuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fkRespostaPergunta FOREIGN KEY (fk_pergunta) REFERENCES pergunta_quiz(id_pergunta)
);

INSERT INTO game (nome, descricao, xp_recompensa) VALUES
('Quiz Automotivo', 'Perguntas sobre carros, tecnologia embarcada e programação.', 50);

INSERT INTO pergunta_quiz 
(pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, tema, fk_game)
VALUES

('O que é um sensor automotivo?',
 'Dispositivo que mede informações do veículo ou ambiente',
 'Peça que aumenta a velocidade do carro',
 'Sistema de som',
 'Tipo de combustível',
 'A',
 'Sensores',
 1),

('Qual é a função da ECU?',
 'Controlar sistemas eletrônicos do carro',
 'Aumentar o tamanho do motor',
 'Melhorar o design do carro',
 'Controlar o volante',
 'A',
 'Eletrônica embarcada',
 1),

('O que o protocolo CAN faz?',
 'Permite comunicação entre módulos do carro',
 'Aumenta a potência do motor',
 'Controla o rádio',
 'Liga os faróis automaticamente',
 'A',
 'Comunicação',
 1),

('O que é uma variável?',
 'Um espaço para armazenar dados',
 'Um erro de código',
 'Um tipo de carro',
 'Um sensor',
 'A',
 'Programação',
 1),

('Qual linguagem é usada no backend do seu projeto?',
 'JavaScript',
 'HTML',
 'CSS',
 'Photoshop',
 'A',
 'Programação',
 1),

('O que o JSON representa?',
 'Formato de troca de dados',
 'Um tipo de banco de dados físico',
 'Uma linguagem de estilo',
 'Um sensor automotivo',
 'A',
 'Programação',
 1),

('Qual sequência está correta?',
 'Sensor → ECU → Atuador',
 'ECU → Sensor → Atuador',
 'Atuador → Sensor → ECU',
 'Motor → ECU → Sensor',
 'A',
 'Lógica',
 1),

('O que um atuador faz?',
 'Executa ações no sistema',
 'Mede temperatura',
 'Armazena dados',
 'Controla o usuário',
 'A',
 'Eletrônica embarcada',
 1),

('Qual componente armazena energia elétrica?',
 'Bateria',
 'Pneu',
 'Motor',
 'Volante',
 'A',
 'Automotivo',
 1),

('Qual sistema ajuda a frear com segurança?',
 'ABS',
 'GPS',
 'Wi-Fi',
 'Bluetooth',
 'A',
 'Automotivo',
 1),


('O que acontece se um sensor falhar?',
 'A ECU pode tomar decisões erradas',
 'O carro fica mais rápido',
 'Nada acontece',
 'O rádio para de funcionar',
 'A',
 'Diagnóstico',
 1),

('O que significa IoT em carros?',
 'Integração com internet e sistemas conectados',
 'Tipo de combustível',
 'Sistema de freio',
 'Tipo de motor',
 'A',
 'Tecnologia',
 1);


