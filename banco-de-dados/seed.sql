CREATE DATABASE drivecode;
USE drivecode;

CREATE TABLE marca_carro (
	id_marca INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);

CREATE TABLE carro (
	id_carro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    tipo VARCHAR(20),
    fk_marca INT,
    CONSTRAINT ctFkMarca FOREIGN KEY (fk_marca) REFERENCES marca_carro (id_marca),
    CONSTRAINT chkTipo CHECK (tipo IN('SUV', 'Esportivo', 'Sedan', 'Hatch'))
);

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30),
    email VARCHAR(80),
    senha VARCHAR(255),
    data_nascimento DATE,
    fk_carroPreferido INT, 
    CONSTRAINT ctFkCarroPreferido FOREIGN KEY (fk_carroPreferido) REFERENCES carro (id_carro)
);

INSERT INTO marca_carro (nome) VALUES
('Toyota'),
('Honda'),
('Ford'),
('Chevrolet'),
('BMW'),
('Audi'),
('Mercedes-Benz'),
('Volkswagen'),
('Hyundai'),
('Nissan');


INSERT INTO carro (nome, tipo, fk_marca) VALUES
-- Toyota
('Corolla', 'Sedan', 1),
('Hilux', 'SUV', 1),
('Yaris', 'Hatch', 1),

-- Honda
('Civic', 'Sedan', 2),
('HR-V', 'SUV', 2),
('Fit', 'Hatch', 2),

-- Ford
('Mustang', 'Esportivo', 3),
('EcoSport', 'SUV', 3),
('Ka', 'Hatch', 3),

-- Chevrolet
('Onix', 'Hatch', 4),
('Cruze', 'Sedan', 4),
('Tracker', 'SUV', 4),

-- BMW
('320i', 'Sedan', 5),
('X5', 'SUV', 5),
('M3', 'Esportivo', 5),

-- Audi
('A3', 'Sedan', 6),
('Q5', 'SUV', 6),
('R8', 'Esportivo', 6),

-- Mercedes
('C200', 'Sedan', 7),
('GLA 200', 'SUV', 7),
('AMG GT', 'Esportivo', 7),

-- Volkswagen
('Gol', 'Hatch', 8),
('Jetta', 'Sedan', 8),
('Tiguan', 'SUV', 8),

-- Hyundai
('HB20', 'Hatch', 9),
('Elantra', 'Sedan', 9),
('Creta', 'SUV', 9),

-- Nissan
('Versa', 'Sedan', 10),
('Kicks', 'SUV', 10),
('March', 'Hatch', 10);

INSERT INTO usuario (nome, email, senha, fk_carroPreferido) VALUES 
('DESENV DRIVE CODE', 'desenv@desenv.com', 'desenv123', 14);
