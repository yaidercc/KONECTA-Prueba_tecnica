const express = require("express");
const cors = require("cors");
const sequelize = require("../src/config/database");
const hemlet = require("helmet");
require("colors");
const database = require("../src/config/database");
const Roles = require("./models/roles");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.path = {
      employee: "/api/employee",
      auth: "/api/auth",
      request: "/api/request",
    };

    this.connectDB();

    this.middlewares();

    this.routes();
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

      // Funcion para quemar los roles en la tabla
      this.createRoles();
    } catch (error) {
      console.log("X ".red + "Error al conectarse a la BD: ".red, error);
    }
  }

  async createRoles() {
    try {
      const roles = ["employee", "admin"];
      
      for (const role of roles) {
        await Roles.findOrCreate({
          where: { name: role },
          defaults: { name: role },
        });
      }
    } catch (error) {
      console.error("X ".red + "Error al crear roles: ".red, error);
    }
  }

  routes() {
    this.app.use(this.path.auth, require("./routes/auth"));
    this.app.use(this.path.request, require("./routes/request"));
    this.app.use(this.path.employee, require("./routes/employee"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("-> ".green + `Conectado en el puerto: ${this.port}`);
    });
  }
}

module.exports = Server;
