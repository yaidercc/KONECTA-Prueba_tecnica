jest.mock("../../models/employee");
jest.mock("../../models/roles");
const employeeModel = require("../../models/employee");
const roleModel = require("../../models/roles");
const employeeServices = require("../../services/employee");

describe("Pruebas en el modulo de empleados", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const employeeInfo = {
    name: "yaider cordoba cordoba",
    username: "yaidercc7",
    password: "yaidercc123",
    join_date: "2020-01-01",
    role_id: 1,
  };
  test("Validar que un empleado se cree correctamente", async () => {
    roleModel.findByPk = jest.fn().mockResolvedValue({
      id: employeeInfo.role_id,
      name: "Empleado",
    });
    employeeModel.findAll = jest.fn().mockResolvedValue([]);

    employeeModel.create = jest.fn().mockResolvedValue(employeeInfo);

    const employee = await employeeServices.createEmployee(employeeInfo);

    expect(employee.username).toBe("yaidercc7");
  });

  test("Debe devolver null para un ID de empleado no existente", async () => {
    employeeModel.findByPk = jest.fn().mockResolvedValue(null);

    const employee = await employeeServices.getEmployee(20);

    expect(employee).toBeNull();
  });
  test("Debe devolver todos los empleados existentes", async () => {
    employeeModel.findAll = jest.fn().mockResolvedValue([
      {
        name: "Ana María López",
        username: "ana_lopez",
        password: "ana123456",
        join_date: "2021-06-15",
        role_id: 2,
      },
      {
        name: "Carlos Pérez",
        username: "carlos_perez",
        password: "carlos789",
        join_date: "2022-03-22",
        role_id: 3,
      },
      {
        name: "Laura Fernández",
        username: "laura_fernandez",
        password: "laura321",
        join_date: "2019-11-30",
        role_id: 1,
      },
    ]);

    const employees = await employeeServices.getAllEmployees();

    expect(employees.length).toBeGreaterThan(0);
    expect(employees).toEqual([
      {
        name: "Ana María López",
        username: "ana_lopez",
        password: "ana123456",
        join_date: "2021-06-15",
        role_id: 2,
      },
      {
        name: "Carlos Pérez",
        username: "carlos_perez",
        password: "carlos789",
        join_date: "2022-03-22",
        role_id: 3,
      },
      {
        name: "Laura Fernández",
        username: "laura_fernandez",
        password: "laura321",
        join_date: "2019-11-30",
        role_id: 1,
      },
    ]);
  });

  test("Retornar error si el usuario ya existe", async () => {
    roleModel.findByPk = jest.fn().mockResolvedValue({
      id: employeeInfo.role_id,
      name: "Empleado",
    });


    employeeModel.create = jest.fn().mockResolvedValue(employeeInfo);

    employeeModel.findAll = jest.fn().mockResolvedValue([{ username: employeeInfo.username }]);

    await expect(employeeServices.createEmployee(employeeInfo)).rejects.thThrow("El nombre de usuario ya existe.");
  });

  test("Deberia eliminar un empleado existente", async () => {
    employeeModel.findByPk = jest.fn().mockResolvedValue({ id: 20 });
    employeeModel.destroy = jest.fn().mockResolvedValue(1);

    const result = await employeeServices.deleteEmployee(20);

    expect(result).toBe(1);
    expect(employeeModel.destroy).toHaveBeenCalledWith({ where: { id: 20 } });
  });
});
