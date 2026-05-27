-- 1. Estructura de la Base de Datos (creates.sql)
CREATE DATABASE IF NOT EXISTS fabrica_maniquies;
USE fabrica_maniquies;

-- Tabla PIEZAS
CREATE TABLE piezas (
    id_pieza INT AUTO_INCREMENT PRIMARY KEY,
    numero_serie VARCHAR(50) NOT NULL UNIQUE,
    tipo_pieza ENUM('Cabeza', 'Torso', 'Brazos', 'Piernas') NOT NULL,
    material VARCHAR(50) NOT NULL,
    color VARCHAR(30) NOT NULL,
    talla ENUM('Pequeño', 'Mediano', 'Largo') DEFAULT 'Mediano',
    lado ENUM('Derecho', 'Izquierdo', 'N/A') DEFAULT 'N/A',
    fecha_fabricacion DATE NOT NULL,
    estado ENUM('Disponible', 'Ensamblado', 'Dañado') DEFAULT 'Disponible'
);

-- Tabla MANIQUIES (Ensamble)
CREATE TABLE maniquies (
    id_maniqui INT AUTO_INCREMENT PRIMARY KEY,
    codigo_maniqui VARCHAR(50) NOT NULL UNIQUE,
    id_cabeza INT NOT NULL,
    id_torso INT NOT NULL,
    id_brazos INT NOT NULL,
    id_piernas INT NOT NULL,
    fecha_ensamblaje DATE NOT NULL,
    estado VARCHAR(30) DEFAULT 'En Stock',
    FOREIGN KEY (id_cabeza) REFERENCES piezas(id_pieza),
    FOREIGN KEY (id_torso) REFERENCES piezas(id_pieza),
    FOREIGN KEY (id_brazos) REFERENCES piezas(id_pieza),
    FOREIGN KEY (id_piernas) REFERENCES piezas(id_pieza)
);
