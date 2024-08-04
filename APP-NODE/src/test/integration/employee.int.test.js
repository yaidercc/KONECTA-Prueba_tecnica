// Importaciones necesarias para las pruebas de integración
const request = require("supertest");
const app = require("../../app");
const sequelize = require("../../config/database"); 
const employeeModel = require("../../models/employee");
const roleModel = require("../../models/roles");
const generateJWT = require("../../utils/generate-jwt");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Pruebas de integracion en el modulo de autenticacion", () => {
    let employee1Id,
    employee2Id;
  beforeAll(async () => {
    await roleModel.create({ id: 1, name: "Empleado" });
    await roleModel.create({ id: 2, name: "Administrador" });

    const employee1 = await employeeModel.create({
        name: 'John Doe',
        username: 'john_doe',
        password: 'password123',
        join_date: '2023-01-01',
        salary:1000000 ,
        role_id: 2,
      });
    const employee2 = await employeeModel.create({
        name: "Ana María López",
        username: "ana_lopez",
        password: "ana123456",
        join_date: "2021-06-15",
        salary:1000000 ,
        role_id: 2,
      });
      employee1Id = employee1.id
      employee2Id = employee2.id
  });

  test("Debe crear un empleado y validar si se creó correctamente", async () => {
    const employeeInfo = {
        id:2,
      name: "yaider cordoba cordoba",
      username: "yaidercc7",
      password: "yaidercc123",
      join_date: "2020-01-01",
      salary: 2000,
      role_id: 1,
    };
  
    const response = await request(app).post("/api/employee").send(employeeInfo);
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();  // Asegúrate de que tu endpoint devuelva un campo `success`
  });

  test('Debe eliminar un empleado', async() => { 
    const employee = await employeeModel.findByPk(employee2Id);
    expect(employee).toBeDefined();
  
    const jwt = await generateJWT(employee1Id);
  
    const response = await request(app).delete(`/api/employee/${employee2Id}`).set("x-token", jwt);

    const deletedEmployee = await employeeModel.findByPk(employee2Id);
    expect(deletedEmployee).toBeNull();
    expect(response.body.success).toBeTruthy();
  });

  test('Debe prohibir a un administrador eliminarse a sí mismo', async() => { 
    const employee = await employeeModel.findByPk(employee2Id);
    expect(employee).toBeDefined();
  
    const jwt = await generateJWT(employee1Id);
  
    const response = await request(app).delete(`/api/employee/${employee1Id}`).set("x-token", jwt);
  
    expect(response.body.success).toBeFalsy()
    
  });
});
