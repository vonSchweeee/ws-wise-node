CREATE DATABASE gerenciador_salas;
USE gerenciador_salas;

CREATE TABLE `organizacao` (
 `id` int NOT NULL AUTO_INCREMENT,
 `nome` VARCHAR(80) DEFAULT NULL,
 `id_organizacao_pai` int DEFAULT NULL,
 `tipo_organizacao` char(1) DEFAULT 'M',
 `dominio` VARCHAR(64) DEFAULT NULL,
 `ativo` tinyint DEFAULT '1',
 `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
 `data_alteracao` timestamp NULL DEFAULT NULL DEFAULT CURRENT_TIMESTAMP,
 `cep` CHAR(9),
 PRIMARY KEY (`id`),
 FOREIGN KEY (`id_organizacao_pai`) REFERENCES `organizacao` (`id`) 
);

CREATE TABLE `sala` (
 `id` int NOT NULL AUTO_INCREMENT,
 `id_organizacao` int DEFAULT NULL,
 `nome` VARCHAR(80) DEFAULT NULL,
 `lugares_disponiveis` int DEFAULT NULL,
 `possui_multimidia` tinyint DEFAULT '1',
 `possui_ac` tinyint DEFAULT '1',
 `area_sala` decimal(9,2) DEFAULT NULL,
 `localizacao` VARCHAR(255) DEFAULT NULL,
 `latitude` double DEFAULT NULL,
 `longitude` double DEFAULT NULL,
 `ativo` tinyint DEFAULT '1',
 `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
 `data_alteracao` timestamp NULL DEFAULT NULL DEFAULT CURRENT_TIMESTAMP,
 `url_imagem` VARCHAR (300) DEFAULT NULL,
 PRIMARY KEY (`id`),
 FOREIGN KEY (`id_organizacao`) REFERENCES `organizacao` (`id`)
);

CREATE TABLE `usuario` (
 `id` int NOT NULL AUTO_INCREMENT,
 `id_organizacao` int DEFAULT NULL,
 `nome` VARCHAR(120) DEFAULT NULL,
 `email` VARCHAR(100) DEFAULT NULL UNIQUE,
 `senha` VARCHAR(255) NOT NULL,
 `url_imagem` VARCHAR(300) DEFAULT NULL,
 PRIMARY KEY (`id`),
 FOREIGN KEY (`id_organizacao`) REFERENCES `organizacao` (`id`)
);

CREATE TABLE `alocacao_sala` (
 `id` int NOT NULL AUTO_INCREMENT,
 `id_sala` int DEFAULT NULL,
 `id_usuario` int DEFAULT NULL,
 `data_hora_inicio` DATETIME DEFAULT NULL,
 `data_hora_fim` DATETIME DEFAULT NULL,
`descricao` VARCHAR(45) DEFAULT NULL,
 `ativo` tinyint DEFAULT '1',
 `data_criacao` timestamp DEFAULT CURRENT_TIMESTAMP,
 `data_alteracao` timestamp DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id`),
 FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
);
