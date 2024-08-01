const employeeServices = require("../services/employee");

const employee = {};
module.exports = employee;

employee.createEmployee = async (req, res) => {
  try {
    const { name, join_date, salary, role_id } = req.body;

    await employeeServices.createEmployee({ name, join_date, salary, role_id });

    return res.json({
      success: true,
      msg: "Empleado creado con exito.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

employee.getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employeeServices.getEmployee(id);

    return res.json({
      success: true,
      employee: employee || "Empleado no encontrado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
