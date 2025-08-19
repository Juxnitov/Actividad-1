const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Actividad1",   
    password: "Sofia*2901*",
    port: 5432
});

app.post("/usuarios", async (req, res) => {
    const { cc, nombre, apellido, edad, peso, altura, genero } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO usuarios (cedula, nombre, apellido, edad, peso, altura, genero)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING IMC`,
            [cc, nombre, apellido, edad, peso, altura, genero]
        );

        res.json({ imc: result.rows[0].imc });
    } catch (err) {
        console.error("Error al insertar usuario:", err);
        res.status(500).send("Error al insertar usuario");
    }
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});