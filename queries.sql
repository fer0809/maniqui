-- 3. Consultas de Verificación (queries.sql)
USE fabrica_maniquies;

-- Listado de Stock: Piernas del lado derecho (serie, material, color)
SELECT numero_serie, material, color 
FROM piezas 
WHERE tipo_pieza = 'Piernas' AND lado = 'Derecho';

-- Cabezas por fechas: Fabricadas después del 2026-01-01
SELECT * 
FROM piezas 
WHERE tipo_pieza = 'Cabeza' AND fecha_fabricacion > '2026-01-01';

-- Modelos por talla: Torsos talla 'mediano' o 'largo', ordenados por material alfabéticamente
SELECT * 
FROM piezas 
WHERE tipo_pieza = 'Torso' AND talla IN ('Mediano', 'Largo')
ORDER BY material ASC;

-- Conteo de Materiales: Total de piezas agrupadas por su material
SELECT material, COUNT(*) as total_piezas
FROM piezas
GROUP BY material;

-- Consulta de Ensamble: Código del Maniquí, fecha de ensamblaje e ID/Serie de la cabeza asignada
SELECT m.codigo_maniqui, m.fecha_ensamblaje, p.numero_serie as serie_cabeza
FROM maniquies m
JOIN piezas p ON m.id_cabeza = p.id_pieza;

-- Disponibilidad Personalizada: Piezas con color o acabado "Negro Mate"
SELECT * 
FROM piezas 
WHERE color = 'Negro Mate';
