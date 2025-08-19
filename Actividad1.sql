CREATE TABLE usuarios 
(
    cedula int PRIMARY KEY,
    nombre text,
    apellido text,
    edad int,
    peso decimal(10,2),
    altura decimal(10,2),
    genero text,
	IMC DECIMAL (10,2)
);

CREATE OR REPLACE FUNCTION calcularImc()
RETURNS TRIGGER AS $$
BEGIN
    NEW.IMC := ROUND(NEW.peso / (NEW.altura * NEW.altura), 2);
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tCalcularImc
BEFORE INSERT ON usuarios
FOR EACH ROW
EXECUTE FUNCTION calcularImc();


SELECT * FROM usuarios;

INSERT INTO usuarios (cedula, nombre, apellido, edad, peso, altura, genero)VALUES
(1121861204,'juan','prieto',18,65,1.85,'masculino');

TRUNCATE TABLE usuarios RESTART IDENTITY;
