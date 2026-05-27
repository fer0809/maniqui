-- ============================================================================
-- SCRIPT DE BASE DE DATOS: GESTIÓN DE MANIQUÍES Y PIEZAS (VERSION SIMPLIFICADA)
-- ============================================================================
-- Diseñado con SQL estándar básico para MariaDB.
-- Ideal para fines académicos y fácil de exponer en clase.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. LIMPIEZA PREVIA (Para poder ejecutar el script varias veces sin errores)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS maniquies;
DROP TABLE IF EXISTS piezas;

-- ----------------------------------------------------------------------------
-- 2. TABLA PIEZAS (Almacena cada componente físico)
-- ----------------------------------------------------------------------------
CREATE TABLE piezas (
    id_pieza INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL UNIQUE,
    tipo_pieza VARCHAR(20) NOT NULL CHECK (tipo_pieza IN ('Cabeza', 'Torso', 'Brazos', 'Piernas')),
    material VARCHAR(50) NOT NULL, -- Fibra de vidrio, Madera, Plástico, etc.
    color VARCHAR(50) NOT NULL,    -- Blanco, Negro, Piel, etc.
    estado VARCHAR(20) DEFAULT 'Disponible' CHECK (estado IN ('Disponible', 'Ensamblado', 'Dañado'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------------------
-- 3. TABLA MANIQUÍES (Representa el ensamble de las 4 piezas)
-- ----------------------------------------------------------------------------
CREATE TABLE maniquies (
    id_maniqui INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL UNIQUE,
    
    -- Claves foráneas obligatorias (NOT NULL) para cumplir con las 4 piezas.
    -- Son únicas (UNIQUE) para evitar que una misma pieza se use en dos maniquíes a la vez.
    id_cabeza INT NOT NULL UNIQUE,
    id_torso INT NOT NULL UNIQUE,
    id_brazos INT NOT NULL UNIQUE,
    id_piernas INT NOT NULL UNIQUE,
    
    fecha_ensamblado DATE NOT NULL,
    estado VARCHAR(30) DEFAULT 'En Stock' CHECK (estado IN ('En Stock', 'Alquilado', 'Exhibido')),
    
    -- Relaciones de integridad referencial
    FOREIGN KEY (id_cabeza) REFERENCES piezas (id_pieza),
    FOREIGN KEY (id_torso) REFERENCES piezas (id_pieza),
    FOREIGN KEY (id_brazos) REFERENCES piezas (id_pieza),
    FOREIGN KEY (id_piernas) REFERENCES piezas (id_pieza)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ============================================================================
-- 4. INSERTAR DATOS DE PRUEBA (Seed Data)
-- ============================================================================

-- Insertamos piezas individuales en el stock
INSERT INTO piezas (numero_serie, tipo_pieza, material, color, estado) VALUES
-- Cabezas
('SN-CAB-101', 'Cabeza', 'Fibra de Vidrio', 'Blanco', 'Ensamblado'),
('SN-CAB-102', 'Cabeza', 'Madera', 'Marrón', 'Ensamblado'),
('SN-CAB-103', 'Cabeza', 'Plástico', 'Negro', 'Disponible'),

-- Torsos
('SN-TOR-201', 'Torso', 'Fibra de Vidrio', 'Blanco', 'Ensamblado'),
('SN-TOR-202', 'Torso', 'Madera', 'Marrón', 'Ensamblado'),
('SN-TOR-203', 'Torso', 'Plástico', 'Negro', 'Disponible'),

-- Brazos (Pares)
('SN-BRA-301', 'Brazos', 'Fibra de Vidrio', 'Blanco', 'Ensamblado'),
('SN-BRA-302', 'Brazos', 'Madera', 'Marrón', 'Ensamblado'),
('SN-BRA-303', 'Brazos', 'Plástico', 'Negro', 'Disponible'),

-- Piernas (Pares)
('SN-PIE-401', 'Piernas', 'Fibra de Vidrio', 'Blanco', 'Ensamblado'),
('SN-PIE-402', 'Piernas', 'Madera', 'Marrón', 'Ensamblado'),
('SN-PIE-403', 'Piernas', 'Plástico', 'Negro', 'Disponible');


-- Ensamblamos y registramos los maniquíes completos
INSERT INTO maniquies (numero_serie, id_cabeza, id_torso, id_brazos, id_piernas, fecha_ensamblado, estado) VALUES
-- Maniquí Blanco de Fibra de Vidrio (Piezas 1, 4, 7 y 10)
('MQ-WHITE-01', 1, 4, 7, 10, '2026-05-01', 'En Stock'),

-- Maniquí Marrón de Madera (Piezas 2, 5, 8 y 11)
('MQ-WOOD-02', 2, 5, 8, 11, '2026-05-10', 'Exhibido');


-- ============================================================================
-- 5. CONSULTAS DE PRUEBA (SELECTS)
-- ============================================================================

-- Consulta 1: Listar todos los maniquíes armados con el detalle de sus piezas
SELECT 
    m.numero_serie AS 'Maniqui',
    m.estado AS 'Estado Ensamble',
    m.fecha_ensamblado AS 'Ensamblado El',
    c.numero_serie AS 'S/N Cabeza',
    t.numero_serie AS 'S/N Torso',
    b.numero_serie AS 'S/N Brazos',
    p.numero_serie AS 'S/N Piernas',
    c.material AS 'Material Usado',
    c.color AS 'Color Predominante'
FROM maniquies m
INNER JOIN piezas c ON m.id_cabeza = c.id_pieza
INNER JOIN piezas t ON m.id_torso = t.id_pieza
INNER JOIN piezas b ON m.id_brazos = b.id_pieza
INNER JOIN piezas p ON m.id_piernas = p.id_pieza;


-- Consulta 2: Listar las piezas que están sueltas en stock (disponibles para repuestos)
SELECT 
    numero_serie AS 'Nro Serie Pieza',
    tipo_pieza AS 'Tipo de Pieza',
    material AS 'Material',
    color AS 'Color',
    estado AS 'Estado'
FROM piezas
WHERE estado = 'Disponible';
