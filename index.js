// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
const cineRoutes = require("./routes/cineRoutes");
const peliculaRoutes = require("./routes/peliculaRoutes");
const sesionRoutes = require("./routes/sesionRoutes");
const entradaRoutes = require("./routes/entradaRoutes");
const salaRoutes = require("./routes/salaRoutes");
const peliculaSalaRoutes = require("./routes/peliculaSalaRoutes");
const butacasRoutes = require("./routes/butacasRoutes");
const butacasOcupadasRoutes = require("./routes/butacasOcupadasRoutes");





const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Configurar rutas de la API Rest
app.use("/api/usuario", usuarioRoutes);
app.use("/api/cine", cineRoutes);
app.use("/api/pelicula", peliculaRoutes);
app.use("/api/sesion", sesionRoutes);
app.use("/api/entrada", entradaRoutes);
app.use("/api/sala", salaRoutes);
app.use("/api/peliculasala", peliculaSalaRoutes);
app.use("/api/butacas", butacasRoutes);
app.use("/api/butacasOcupadas", butacasOcupadasRoutes);








// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}
// Exportamos la aplicación para poder hacer pruebas
module.exports = app;