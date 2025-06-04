// Import the service layer for handling component-related operations
const usuarioService = require("../services/usuarioService");
const { logMensaje } = require("../utils/logger");
const Respuesta = require("../utils/respuesta");
// Importar fichero de configuración con variables de entorno
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');

class UsuarioController {
  // Handles retrieval of all usuario based on query parameters
  async getAllUsuario(req, res) {
    try {
        const data = await usuarioService.getAllUsuario();
        res.json(Respuesta.exito(data, "Datos de Usuario recuperados"));
    } catch (err) {
      // Handle errors during the service call
      console.log(err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles retrieval of a single usuario by its ID
  async getUsuarioById(req, res) {
    try {
      const idUsuario = req.params.id; // Extract component ID from the request URL

      // Fetch only the sensei without related data
      const usuario = await usuarioService.getUsuarioById(
        idUsuario
      );
      if (!usuario) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Usuario no encontrado: ${idUsuario}`)
          );
      } else {
        res.json(Respuesta.exito(usuario, "Usuario recuperado"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async login(req, res) {
    try {
      
      const usuarioData = req.body;

      // Fetch only the sensei without related data
      const usuario = await usuarioService.login(
        usuarioData
      );
      if (!usuario) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Login incorrecto`)
          );
      } else {
        // Generar el token JWT
      /*  const token = jwt.sign(
          {
            sub: usuario.id,
            name: usuario.username,
            email: usuario.email,
            role: usuario.role,
          },
          config.secretKey,
          { expiresIn: "1h" }
        );
  
        // Configurar la cookie con el token
        res.cookie("token", token, {
          httpOnly: true, // Evita que JavaScript acceda a la cookie
          secure: false, // Solo en HTTPS en producción
          sameSite: 'Lax', // Protección CSRF // Lax en desarrollo
          maxAge: 3600000, // 1 hora en milisegundos
          // domain: "localhost",
        });
*/
        res.json(Respuesta.exito(usuario, "Login exitoso"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al al hacer el login: ${req.originalUrl}`
          )
        );
    }
  }

  async signup(req, res) {
    try {
      const usuarioData = req.body;

      // Fetch only the sensei without related data
      const usuario = await usuarioService.signup(
        usuarioData
      );
      if (!usuario) {
        // Handle case where the component is not found
        res
          .status(404)
          .json(
            Respuesta.error(null, `Error creando usuario: ${idUsuario}`)
          );
      } else {
        
        res.json(Respuesta.exito(usuario, "Usuario creado"));
      }
      
    } catch (err) {
      // Handle errors during the service call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al crear el usuario: ${req.originalUrl}`
          )
        );
    }
  }

  async logout(req, res) {
      res.clearCookie('token', { httpOnly: true, secure: false/*'production'*/ });
      res.status(200).json(Respuesta.exito( null, "Cierre de sesión exitoso"));
  };

  // Handles creation of a new usuario
  async createUsuario(req, res) {
    try {
      const usuarioData = req.body; // Extract the component data from the request body
      const result = await usuarioService.createUsuario(usuarioData); // Call service to create the sensei
      res
        .status(201)
        .json(
          Respuesta.exito(
            { insertId: result.insertId },
            "Usuario dado de alta"
          )
        );
    } catch (err) {
      // Handle errors during the creation process
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al insertar el Usuario: ${req.originalUrl}`
          )
        );
    }
  }

  // Handles updating of a usuario by its ID
  async updateUsuario(req, res) {
    try {
        const { id } = req.params;
        const { nombre, email, password, rol } = req.body;
        const data = await usuarioService.updateUsuario(id, { nombre, email, password, rol });
        res.json(Respuesta.exito(data, "Usuario actualizado correctamente"));
    } catch (err) {
        res.status(500).json(Respuesta.error(null, `Error al actualizar el Usuario: ${req.originalUrl}`));
    }
  }

  // Handles deletion of a usuario by its ID
  async deleteUsuario(req, res) {
    try {
      const idUsuario = req.params.id; // Extract component ID from the request URL
      await usuarioService.deleteUsuario(idUsuario); // Call service to delete the component
      res.status(204).end(); // 204: No Content indicates successful deletion with no response body
    } catch (err) {
      // Handle errors during the deletion process
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = new UsuarioController();
