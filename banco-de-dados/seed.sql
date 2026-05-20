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
		textura_carro VARCHAR(255) DEFAULT 'nenhuma',
		fk_usuario INT UNIQUE,
		CONSTRAINT fkCarroUsuario FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
	);
    
	CREATE TABLE item_customizacao (
		id_item INT PRIMARY KEY AUTO_INCREMENT,
		nome VARCHAR(80),
		tipo VARCHAR(30),
		valor VARCHAR(255),
		descricao VARCHAR(255),
		xp_minimo INT DEFAULT 0
	);
	INSERT INTO item_customizacao (nome, tipo, valor, descricao, xp_minimo)  VALUES
	('Mudar cor do carro', 'cor_livre', NULL, 'Libera o seletor de cor do carro', 0),
	('Textura carbono', 'textura', './assets/glb/textures/texture_carbon.jpg', 'Aplica textura de carbono no carro', 150),
	('Textura glitter', 'textura', './assets/glb/textures/texture_glitter.jpg', 'Aplica textura camuflada no carro', 250),
	('Ativar neon', 'neon_toggle', NULL, 'Permite usar neon no carro', 300),
	('Cor personalizada do neon', 'neon_color', NULL, 'Permite escolher qualquer cor para o neon', 450);
    
    CREATE TABLE usuario_item (
		id_usuario_item INT PRIMARY KEY AUTO_INCREMENT,
		fk_usuario INT,
		fk_item INT,

		FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
		FOREIGN KEY (fk_item) REFERENCES item_customizacao(id_item),
        
        UNIQUE (fk_usuario, fk_item)
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

	-- QUIZ 1
	INSERT INTO game (nome, descricao, xp_recompensa) VALUES
	('Quiz Geral', 'Perguntas sobre carros, tecnologia embarcada e programação.', 120);

	-- QUIZ 1
	INSERT INTO pergunta_quiz 
	(pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, tema, fk_game)
	VALUES

	('O que é um sensor automotivo?',
	 'Dispositivo que mede informações do veículo ou ambiente',
	 'Peça que aumenta a velocidade do carro',
	 'Sistema de som',
	 'Tipo de combustível',
	 'A',
	 'Automotivo',
	 1),

	('Qual é a função da ECU?',
	 'Controlar sistemas eletrônicos do carro',
	 'Aumentar o tamanho do motor',
	 'Melhorar o design do carro',
	 'Controlar o volante',
	 'A',
	 'Eletrônica',
	 1),

	('O que o protocolo CAN faz?',
	 'Permite comunicação entre módulos do carro',
	 'Aumenta a potência do motor',
	 'Controla o rádio',
	 'Liga os faróis automaticamente',
	 'A',
	 'Eletrônica',
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
	 'Eletrônica',
	 1),

	('O que um atuador faz?',
	 'Executa ações no sistema',
	 'Mede temperatura',
	 'Armazena dados',
	 'Controla o usuário',
	 'A',
	 'Eletrônica',
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
	 'Eletrônica',
	 1),

	('O que significa IoT em carros?',
	 'Integração com internet e sistemas conectados',
	 'Tipo de combustível',
	 'Sistema de freio',
	 'Tipo de motor',
	 'A',
	 'Tecnologia',
	 1);
	 
	 -- QUIZ 2
	INSERT INTO game (nome, descricao, xp_recompensa) VALUES
	('Quiz PowerUp', 'Quiz rápido com powerups como tempo extra, eliminar alternativas, pular pergunta e XP dobrado.', 150);

	INSERT INTO pergunta_quiz 
	(pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, tema, fk_game)
	VALUES

	('Qual item ajuda um carro a se movimentar?',
	 'Motor',
	 'Banco',
	 'Volante parado',
	 'Porta',
	 'A',
	 'Automotivo',
	 2),

	('Qual combustível é comum em carros no Brasil?',
	 'Gasolina',
	 'Água',
	 'Óleo de cozinha',
	 'Suco',
	 'A',
	 'Automotivo',
	 2),

	('Qual peça é usada para controlar a direção do carro?',
	 'Volante',
	 'Pneu',
	 'Farol',
	 'Banco',
	 'A',
	 'Automotivo',
	 2),

	('Qual destes é um meio de guardar dados em JavaScript?',
	 'Variável',
	 'Pneu',
	 'Retrovisor',
	 'Farol',
	 'A',
	 'Programação',
	 2),

	('Qual comando mostra algo no console do navegador?',
	 'console.log()',
	 'print.carro()',
	 'mostrarBanco()',
	 'alertaBanco()',
	 'A',
	 'Programação',
	 2),

	('O que HTML normalmente estrutura?',
	 'O conteúdo da página',
	 'O motor do carro',
	 'A bateria do carro',
	 'A senha do Wi-Fi',
	 'A',
	 'Web',
	 2),

	('O que CSS normalmente altera?',
	 'A aparência da página',
	 'O banco de dados',
	 'O motor',
	 'A placa do carro',
	 'A',
	 'Web',
	 2),

	('O que JavaScript ajuda a criar?',
	 'Interações na página',
	 'Gasolina',
	 'Pneus',
	 'Óleo do motor',
	 'A',
	 'Web',
	 2),

	('Qual destes representa uma cor em HEX?',
	 '#FF0000',
	 'vermelho forte muito',
	 'cor(azul)',
	 'rgb texto',
	 'A',
	 'Web',
	 2),

	('O que significa XP em um sistema gamificado?',
	 'Experiência',
	 'Xícara de pão',
	 'Extintor principal',
	 'Extra porta',
	 'A',
	 'Gamificação',
	 2),

	('Se o usuário acerta uma pergunta, o que normalmente acontece?',
	 'Ganha pontos ou XP',
	 'Perde a conta',
	 'O banco apaga tudo',
	 'O carro some',
	 'A',
	 'Gamificação',
	 2),

	('Qual powerup combina com uma pergunta com tempo?',
	 'Adicionar segundos',
	 'Trocar o banco de dados',
	 'Apagar o usuário',
	 'Fechar o navegador',
	 'A',
	 'Gamificação',
	 2);


	select * from usuario;
