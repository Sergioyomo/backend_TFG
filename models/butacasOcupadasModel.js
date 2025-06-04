// Importamos la configuración de la base de datos y los utilitarios para loguear errores
const db = require("../config/dbConfig");
const { logErrorSQL, logMensaje } = require("../utils/logger");

class ButacasOcupadasModel {
  // Método para obtener todos los butacasOcupadas
  async getAllButacasOcupadas() {
    const query = "SELECT * FROM butacas_ocupadas";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }
  async getAllButacasOcupadasSesion(id_sesion, id_sala) {
    const query = "SELECT b.id, b.fila, b.numero, CASE WHEN bo.id IS NULL THEN false ELSE true END AS ocupada FROM butacas b LEFT JOIN butacas_ocupadas bo ON bo.id_butacas = b.id AND bo.id_sesion = ? WHERE b.id_sala = ? ORDER BY b.fila, b.numero;";
    try {
       // Usamos await para obtener los datos de la consulta
       const [result] = await db.promise().query(query, [id_sesion, id_sala]); // Usamos promise() para que query sea compatible con promesas
       return result; // Retornamos el resultado
    } catch (err) {
      // Si hay un error, lo registramos y lo lanzamos
      logErrorSQL(err);
      throw err;
    }
  }

   // Método para obtener un butacasOcupadas por su ID
  async getButacasOcupadasById(idButacasOcupadas) {
    const query = "SELECT * FROM butacas_ocupadas WHERE id = ?";
    try {
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [idButacasOcupadas]); // Usamos promise() para que query sea compatible con promesas
      if (result.length === 0) {
        return null; // Si no se encuentra el componente, retornamos null
      }
      return result[0]; // Devolvemos el primer componente encontrado
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para crear un butacasOcupadas (insertar en la base de datos)
  async createButacasOcupadas(butacasOcupadasData) {
    const query =
      "INSERT INTO butacas_ocupadas (id_sesion, id_butacas) VALUES ?";
    const values = butacasOcupadasData.butacas.map((b) => [butacasOcupadasData.id_sesion, b.id]);

    try {
      // Ejecutamos la consulta con los valores proporcionados
      // Usamos await para obtener los datos de la consulta
      const [result] = await db.promise().query(query, [values]); // Usamos promise() para que query sea compatible con promesas
      return result; // Retornamos el resultado de la inserción
    } catch (err) {
      logErrorSQL(err);
      throw err; // Si hay un error, lo lanzamos
    }
  }

  // Método para actualizar un butacasOcupadas
  async updateButacasOcupadas(updateData, id) {
    const fields = [];
    const values = [];

    Object.keys(updateData).forEach((key) => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });

    if (fields.length === 0) {
      throw new Error("No hay datos para actualizar");
    }

    values.push(id); // Agregamos el ID al final para el WHERE

    const query = `UPDATE butacas_ocupadas SET ${fields.join(", ")} WHERE id = ?`;
    
    try {
      const [result] = await db.promise().query(query, values);
      return result.affectedRows > 0;
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  // Método para eliminar un butacasOcupadas
  async deleteButacasOcupadas(idButacasOcupadas) {
    const query = "DELETE FROM butacas_ocupadas WHERE id = ?";
    try {
      const [result] = await db.promise().query(query, [idButacasOcupadas]); // Usamos promise() para que query sea compatible con promesas
      return result; // Devolvemos el resultado de la eliminación
    } catch (err) {
      logErrorSQL(err);
      throw err;
    }
  }

  

  // Otros métodos del modelo pueden ser añadidos aquí...
}

// Exportamos una instancia única de ComponenteModel
module.exports = new ButacasOcupadasModel();
