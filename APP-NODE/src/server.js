const express = require("express");
const cors = require("cors");
const sequelize = require("../src/config/database");
const hemlet = require("helmet");
require("colors");
const database = require("../src/config/database");
const Roles = require("./models/roles");
const { swaggerDocs: V1SwaggerDocs } = require("./config/swagger");
class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.path = {
      employee: "/api/employee",
      auth: "/api/auth",
      request: "/api/request",
    };

    if (process.env.NODE_ENV !== "test") {
      this.connectDB();
    }

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    this.app.use(express.json());
    this.app.use(hemlet());
    // V1SwaggerDocs(this.app, this.port);
  }

  async connectDB() {
    try {
      await database.authenticate();
      console.log("-> ".green + "Conexion exitosa a la BD");
      await sequelize.sync();

      // Funcion para quemar los roles en la tabla
      this.createRoles();
    } catch (error) {
      console.log("X ".red + "Error al conectarse a la BD: ".red, error);
    }
  }

  async createRoles() {
    try {
      const roles = ["Empleado", "Administrador"];

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
    if (process.env.NODE_ENV !== "test") {
      this.app.listen(this.port, () => {
        console.log("-> ".green + `Conectado en el puerto: ${this.port}`);
      });
    } else {
      console.log("Modo de pruebas");
    }
  }
}

module.exports = Server;
