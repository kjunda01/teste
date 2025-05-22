-- Remover a view primeiro
DROP VIEW IF EXISTS view_veiculos_proprietarios CASCADE;

-- Remover a tabela de snapshot
DROP TABLE IF EXISTS ultimos_veiculos CASCADE;

-- Remover veículos (possui FK para proprietários)
DROP TABLE IF EXISTS veiculos CASCADE;

-- Por fim, remover proprietários
DROP TABLE IF EXISTS proprietarios CASCADE;


-- Proprietários
CREATE TABLE proprietarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL
);

-- Veículos
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano VARCHAR(4),
    placa VARCHAR(20) UNIQUE NOT NULL,
    cor VARCHAR(30),
    status VARCHAR(30),
    proprietario_id INTEGER NOT NULL,
    tipo_placa VARCHAR(20),

    CONSTRAINT fk_proprietario
        FOREIGN KEY (proprietario_id)
        REFERENCES proprietarios(id)
        ON DELETE CASCADE
);

-- View combinada: veículos + dados do proprietário
CREATE VIEW view_veiculos_proprietarios AS
SELECT
    v.id AS veiculo_id,
    v.tipo,
    v.marca,
    v.modelo,
    v.ano,
    v.placa,
    v.cor,
    v.status,
    p.id AS proprietario_id,
    p.nome AS proprietario_nome,
    p.matricula AS proprietario_matricula,
    v.tipo_placa
FROM
    veiculos v
JOIN
    proprietarios p
ON
    v.proprietario_id = p.id;

-- Últimos veículos (usado como "snapshot" ou log)
CREATE TABLE ultimos_veiculos (
    veiculo_id INTEGER,
    tipo VARCHAR(50),
    marca VARCHAR(50),
    modelo VARCHAR(50),
    ano VARCHAR(4),
    placa VARCHAR(20),
    cor VARCHAR(30),
    status VARCHAR(30),
    proprietario_id INTEGER,
    proprietario_nome VARCHAR(100),
    proprietario_matricula VARCHAR(50),
    tipo_placa VARCHAR(20),

    PRIMARY KEY (placa)
);

-- Inserção dos proprietários
INSERT INTO proprietarios (nome, matricula) VALUES
('Ana Souza', 'MAT001'),
('Carlos Lima', 'MAT002'),
('Juliana Alves', 'MAT003');

-- Inserção dos veículos (agora usando o id do proprietário)
INSERT INTO veiculos (tipo, marca, modelo, ano, placa, cor, status, proprietario_id, tipo_placa)
VALUES
('Carro', 'Toyota', 'Corolla', '2018', 'ABC1A23', 'Prata', 'Ativo', 1, 'Mercosul'),
('Moto', 'Honda', 'CG 160', '2020', 'DEF2234', 'Preta', 'Ativo', 1, 'Normal'),
('Carro', 'Volkswagen', 'Gol', '2015', 'GHI3245', 'Branco', 'Inativo', 2, 'Normal'),
('Caminhão', 'Mercedes-Benz', 'Axor', '2021', 'JKL4D56', 'Azul', 'Ativo', 3, 'Mercosul');

-- Inserção na tabela de últimos veículos
INSERT INTO ultimos_veiculos
SELECT *
FROM view_veiculos_proprietarios
WHERE placa = 'ABC1A23'
ON CONFLICT (placa) DO NOTHING;
