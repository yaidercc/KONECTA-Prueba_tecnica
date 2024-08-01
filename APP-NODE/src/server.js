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
      employee: "/api/employee",
      auth: "/api/auth",
      request: "/api/request"
    };

    this.connectDB();

    this.middlewares();

    this.routes()
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(hemlet());
  }

  async connectDB() {
    try {
      await database.authenticate();
      console.log("-> ".green + "Conexion exitosa a la BD");
      await sequelize.sync({ force: true });
    } catch (error) {
      console.log("X ".red + "Error al conectarse a la BD: ".red, error);
    }
  }

  routes() {
    this.app.use(this.path.auth,require("./routes/auth"))
    this.app.use(this.path.request,require("./routes/request"))
    this.app.use(this.path.employee,require("./routes/employee"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("-> ".green +`Conectado en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
