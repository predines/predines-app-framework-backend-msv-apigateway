/*
 * Crearemos una tabla dentro de nuestra base de datos EDUCA para realizar las pruebas de conexión con el Backend y/o Microservicios
 * */

CREATE TABLE xpl_hello
(
id INT GENERATED ALWAYS AS IDENTITY,
name varchar(100),
firstname varchar(100)
)

--Insertamos Información a la tabla

INSERT INTO xpl_hello
(name, firstname)
VALUES 
('CESAR','BANCES'),
('MARCELO','BANCES'),
('SERGIO','BANCES'),
('VALERIA','BANCES')

--REVISAMOS LOS REGISTROS INSERTADOS

SELECT * FROM xpl_hello;

--Creamos una función para traer datos
--=====================================


CREATE OR REPLACE FUNCTION sp_xpl_hello_microservice_by_id(
		_id INT
	) RETURNS TABLE (
		id INT,
		name VARCHAR,
		firstname VARCHAR
	) AS $$ 																								 
SELECT DISTINCT 
	id,	
	name,
	firstname
FROM xpl_hello
WHERE 
	id =_id
$$ LANGUAGE SQL;


--Probamos la función

SELECT * FROM sp_xpl_hello_microservice_by_id(2);

