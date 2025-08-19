document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-imc");
    const resultadoDiv = document.getElementById("resultado-imc");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = {
            cc: document.getElementById("cc").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: document.getElementById("edad").value,
            peso: document.getElementById("peso").value,
            altura: document.getElementById("altura").value,
            genero: document.getElementById("genero").value
        };
        const edad = Number(datos.edad);

        try {
            if (edad > 0 && datos.cc.toString().length < 11 && datos.cc.toString().length > 0 && Number(datos.peso) > 0 && Number(datos.altura > 0)) {
                const res = await fetch("http://localhost:3000/usuarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos)
                });

                if (!res.ok) {
                    throw new Error("Error al guardar usuario");
                }

                const data = await res.json();
                resultadoDiv.textContent = `IMC calculado: ${data.imc}`;
                resultadoDiv.style.color = "green";
                resultadoDiv.style.fontWeight = "bold";

                form.reset();
            } else {
                let errores = [];
                if (edad <= 0) {
                    errores.push("La edad debe ser mayor que 0");
                }
                if (datos.cc.toString().length >= 11) {
                    errores.push("La cedula debe tener menos de 11 digitos");
                }
                if (Number(datos.cc) <= 0) {
                    errores.push("La cedula debe tener al menos 1 digito");
                }
                if (Number(datos.peso) <= 0) {
                    errores.push("El peso debe ser mayor que 0");
                }
                if (Number(datos.altura) <= 0) {
                    errores.push("La altura debe ser mayor que 0");
                }
                if (errores.length > 0) {
                    alert(errores.join('\n'));
                }
            }
        } catch (error) {
            console.error("Error:", error);
            resultadoDiv.textContent = "Ocurrió un error al calcular el IMC";
            resultadoDiv.style.color = "red";
        }
    });
});