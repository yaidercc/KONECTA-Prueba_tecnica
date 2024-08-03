jest.mock("../../models/employee");
const employeeModel = require("../../models/employee");
const authServices = require("../../services/auth");


describe("Pruebas en el módulo de autenticación", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe devolver un array vacío si el usuario no existe", async () => {
    const username = "usuario_inexistente";
  
    employeeModel.findAll = jest.fn().mockResolvedValue([]);
  
    const result = await authServices.login(username);
  
    expect(result).toEqual([]);
    expect(employeeModel.findAll).toHaveBeenCalledWith({
      where: { username },
      attributes: ["id", "username", "password", "name", "join_date", "salary"],
    });
  });

  test("Debe devolver un array vacío si el usuario no existe", async () => {
    const username = "usuario_inexistente";
  
    employeeModel.findAll = jest.fn().mockResolvedValue([]);
  
    const result = await authServices.login(username);
  
    expect(result).toEqual([]);
    expect(employeeModel.findAll).toHaveBeenCalledWith({
      where: { username },
      attributes: ["id", "username", "password", "name", "join_date", "salary"],
    });
  });
});
