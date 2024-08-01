const express = require("express");
const cors = require("cors");
const database = require("../src/config/database");
const sequelize = require("../src/config/database");
const hemlet = require("helmet");
require("colors");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.path = {
      user: "/api/user",
      auth: "/api/auth",
    };

    // Conexion a la base de datos
    this.connectDB();

    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(hemlet());
  }

  async connectDB() {
    try {
      await database.authenticate();
      console.log("-> Conexion exitosa a la BD: ");
      await sequelize.sync({ force: true });
    } catch (error) {
      console.log("X Error al conectarse a la BD: ".red, error);
    }
  }

  routes() {}

  listen() {
    this.app.listen(this.port, () => {
      console.log(`-> Conectado en el puerto: ${this.port}`.green);
    });
  }
}

module.exports = Server;
