jest.mock("../../models/auth");
const authModel = require("../../models/auth");
const authServices = require("../../services/auth");

describe("Pruebas en el módulo de autenticación", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Validar que los datos de inicio de sesión sean correctos", async () => {
    authModel.findAll.mockResolvedValue([
      {
        id: 1,
        username: "yaidercc7",
        password: "$2a$10$T0NH3e0c8xEIRypRNyzkQOacpCn8rnO29g4jRt8MgSG7HgfpHoO2u",
        user_id: 1,
      },
    ]);
    const [employee] = await authServices.login("yaidercc7");
    expect(employee.username).toBe("yaidercc7");
    expect(employee.password).toBe("$2a$10$T0NH3e0c8xEIRypRNyzkQOacpCn8rnO29g4jRt8MgSG7HgfpHoO2u");
  });

  test("Debe retornar un array vacio si no encuentra el usuario", async () => {
    authModel.findAll.mockResolvedValue([]);
    const [employee] = await authServices.login("yaidercc");
    expect(employee).toBeUndefined();
  });

  test("Debe devolver error al ingresar 2 registros de inicio de sesión al mismo usuario", async () => {
    const loginData = {
      user_id: 1,
      username: "yaidercc",
      password: "yaidercc123",
    };
    authModel.findAll.mockResolvedValue([{ user_id: 1 }]);
    await expect(authServices.createEmployeeLogin(loginData)).rejects.toThrow("El usuario ya tiene informacion de inicio de sesion");
  });
});
