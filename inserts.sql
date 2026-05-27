-- 2. Carga de Datos (inserts.sql)
USE fabrica_maniquies;

-- CABEZAS (10)
INSERT INTO piezas (numero_serie, tipo_pieza, material, color, talla, fecha_fabricacion, estado) VALUES
('CAB-001', 'Cabeza', 'Plástico', 'Blanco', 'Mediano', '2025-12-01', 'Ensamblado'),
('CAB-002', 'Cabeza', 'Madera', 'Marrón', 'Mediano', '2026-01-15', 'Ensamblado'),
('CAB-003', 'Cabeza', 'Fibra de Vidrio', 'Negro Mate', 'Largo', '2026-02-10', 'Ensamblado'),
('CAB-004', 'Cabeza', 'Plástico', 'Gris', 'Pequeño', '2026-03-05', 'Ensamblado'),
('CAB-005', 'Cabeza', 'Fibra de Vidrio', 'Blanco', 'Largo', '2026-04-20', 'Ensamblado'),
('CAB-006', 'Cabeza', 'Madera', 'Natural', 'Mediano', '2025-11-20', 'Disponible'),
('CAB-007', 'Cabeza', 'Plástico', 'Negro Mate', 'Mediano', '2026-05-01', 'Disponible'),
('CAB-008', 'Cabeza', 'Fibra de Vidrio', 'Cromo', 'Pequeño', '2026-05-05', 'Disponible'),
('CAB-009', 'Cabeza', 'Plástico', 'Blanco', 'Largo', '2026-05-10', 'Disponible'),
('CAB-010', 'Cabeza', 'Madera', 'Roble', 'Mediano', '2026-05-15', 'Disponible');

-- TORSOS (10)
INSERT INTO piezas (numero_serie, tipo_pieza, material, color, talla, fecha_fabricacion, estado) VALUES
('TOR-001', 'Torso', 'Plástico', 'Blanco', 'Mediano', '2026-01-10', 'Ensamblado'),
('TOR-002', 'Torso', 'Madera', 'Marrón', 'Largo', '2026-01-20', 'Ensamblado'),
('TOR-003', 'Torso', 'Fibra de Vidrio', 'Negro Mate', 'Mediano', '2026-02-15', 'Ensamblado'),
('TOR-004', 'Torso', 'Plástico', 'Gris', 'Pequeño', '2026-03-10', 'Ensamblado'),
('TOR-005', 'Torso', 'Fibra de Vidrio', 'Blanco', 'Largo', '2026-04-25', 'Ensamblado'),
('TOR-006', 'Torso', 'Madera', 'Natural', 'Mediano', '2025-12-05', 'Disponible'),
('TOR-007', 'Torso', 'Plástico', 'Negro Mate', 'Largo', '2026-05-02', 'Disponible'),
('TOR-008', 'Torso', 'Fibra de Vidrio', 'Cromo', 'Pequeño', '2026-05-06', 'Disponible'),
('TOR-009', 'Torso', 'Plástico', 'Blanco', 'Mediano', '2026-05-11', 'Disponible'),
('TOR-010', 'Torso', 'Madera', 'Roble', 'Largo', '2026-05-16', 'Disponible');

-- BRAZOS (10)
INSERT INTO piezas (numero_serie, tipo_pieza, material, color, talla, fecha_fabricacion, estado) VALUES
('BRA-001', 'Brazos', 'Plástico', 'Blanco', 'Mediano', '2026-01-12', 'Ensamblado'),
('BRA-002', 'Brazos', 'Madera', 'Marrón', 'Largo', '2026-01-22', 'Ensamblado'),
('BRA-003', 'Brazos', 'Fibra de Vidrio', 'Negro Mate', 'Mediano', '2026-02-17', 'Ensamblado'),
('BRA-004', 'Brazos', 'Plástico', 'Gris', 'Pequeño', '2026-03-12', 'Ensamblado'),
('BRA-005', 'Brazos', 'Fibra de Vidrio', 'Blanco', 'Largo', '2026-04-27', 'Ensamblado'),
('BRA-006', 'Brazos', 'Madera', 'Natural', 'Mediano', '2025-12-07', 'Disponible'),
('BRA-007', 'Brazos', 'Plástico', 'Negro Mate', 'Mediano', '2026-05-03', 'Disponible'),
('BRA-008', 'Brazos', 'Fibra de Vidrio', 'Cromo', 'Pequeño', '2026-05-07', 'Disponible'),
('BRA-009', 'Brazos', 'Plástico', 'Blanco', 'Largo', '2026-05-12', 'Disponible'),
('BRA-010', 'Brazos', 'Madera', 'Roble', 'Mediano', '2026-05-17', 'Disponible');

-- PIERNAS (10)
INSERT INTO piezas (numero_serie, tipo_pieza, material, color, talla, lado, fecha_fabricacion, estado) VALUES
('PIE-001', 'Piernas', 'Plástico', 'Blanco', 'Mediano', 'Derecho', '2026-01-14', 'Ensamblado'),
('PIE-002', 'Piernas', 'Madera', 'Marrón', 'Largo', 'Derecho', '2026-01-24', 'Ensamblado'),
('PIE-003', 'Piernas', 'Fibra de Vidrio', 'Negro Mate', 'Mediano', 'Derecho', '2026-02-19', 'Ensamblado'),
('PIE-004', 'Piernas', 'Plástico', 'Gris', 'Pequeño', 'Derecho', '2026-03-14', 'Ensamblado'),
('PIE-005', 'Piernas', 'Fibra de Vidrio', 'Blanco', 'Largo', 'Derecho', '2026-04-29', 'Ensamblado'),
('PIE-006', 'Piernas', 'Madera', 'Natural', 'Mediano', 'Derecho', '2025-12-09', 'Disponible'),
('PIE-007', 'Piernas', 'Plástico', 'Negro Mate', 'Largo', 'Derecho', '2026-05-04', 'Disponible'),
('PIE-008', 'Piernas', 'Fibra de Vidrio', 'Cromo', 'Pequeño', 'Derecho', '2026-05-08', 'Disponible'),
('PIE-009', 'Piernas', 'Plástico', 'Blanco', 'Mediano', 'Derecho', '2026-05-13', 'Disponible'),
('PIE-010', 'Piernas', 'Madera', 'Roble', 'Largo', 'Derecho', '2026-05-18', 'Disponible');

-- MANIQUIES COMPLETOS (5)
INSERT INTO maniquies (codigo_maniqui, id_cabeza, id_torso, id_brazos, id_piernas, fecha_ensamblaje, estado) VALUES
('MQ-COMP-001', 1, 11, 21, 31, '2026-05-20', 'En Stock'),
('MQ-COMP-002', 2, 12, 22, 32, '2026-05-21', 'Exhibición'),
('MQ-COMP-003', 3, 13, 23, 33, '2026-05-22', 'Vendido'),
('MQ-COMP-004', 4, 14, 24, 34, '2026-05-23', 'En Stock'),
('MQ-COMP-005', 5, 15, 25, 35, '2026-05-24', 'En Stock');
