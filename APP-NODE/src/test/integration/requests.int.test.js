
const request = require("supertest");
const app = require("../../app");
const sequelize = require("../../config/database");
const employeeModel = require("../../models/employee");
const roleModel = require("../../models/roles");
const requestModel = require("../../models/request");
const generateJWT = require("../../utils/generate-jwt");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Pruebas de integracion al modulo de requests", () => {
  let employee1Id,
  requestId;

  beforeAll(async () => {
    await roleModel.create({ id: 1, name: "Empleado" });
    await roleModel.create({ id: 2, name: "Administrador" });

    const employee1 = await employeeModel.create({
      name: "John Doe",
      username: "john_doe",
      password: "password123",
      join_date: "2023-01-01",
      salary: 1000000,
      role_id: 2,
    });

    const request= await requestModel.create({
        code: "RQ23222",
        description: "esta es una descripcion",
        summary: "este es un resumen",
        employee_id: 1
    });

    employee1Id = employee1.id;
    requestId = request.id;
  });

  test("Debe crear solicitud", async () => {
    const requestInfo = {
      code: "RQ23123",
      description: "esta es una descripcion",
      summary: "este es un resumen",
    };

    const jwt = await generateJWT(employee1Id);

    const response = await request(app).post("/api/request").set("x-token", jwt).send(requestInfo);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });

  test("Debe eliminar solicitud", async () => {
    const findRequest = await requestModel.findByPk(requestId);
    expect(findRequest).toBeDefined();

    const jwt = await generateJWT(employee1Id);
    const response = await request(app).delete(`/api/request/${requestId}`).set("x-token", jwt).send();

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
  });
});
