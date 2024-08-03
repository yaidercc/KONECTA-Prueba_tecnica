const authServices = require("../services/auth");
const employeeServices = require("../services/employee");
const bycryptjs = require("bcryptjs");
const employee = {};
module.exports = employee;

employee.createEmployee = async (req, res) => {
  try {
    const { name, join_date, salary, role_id, username, password } = req.body;

    const salt = bycryptjs.genSaltSync();
    const encriptedPassword = bycryptjs.hashSync(password, salt);

    await employeeServices.createEmployee({ name, join_date, salary, role_id, username, password: encriptedPassword });

    return res.json({
      success: true,
      msg: "Empleado creado con exito.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

employee.getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeServices.getAllEmployees();

    return res.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

employee.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: employee_id } = req.employee;

    if (id == employee_id) {
      return res.status(400).json({
        success: false,
        msg: "No puedes eliminarte a ti mismo.",
      });
    }

    await employeeServices.deleteEmployee(id);

    return res.json({
      success: true,
      msg: "Empleado eliminado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

employee.getRoles = async (req, res) => {
  try {
    const roles = await employeeServices.getRoles();

    return res.json({
      success: true,
      roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
