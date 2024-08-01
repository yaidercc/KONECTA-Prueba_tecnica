const employeeServices = require("../services/employee");

const employee = {};
module.exports = employee;

employee.createEmployee = async (req = Request, res = Response) => {
  try {
    const { name, join_date, salary, role_id } = req.body;

    await employeeServices.createEmployee({name, join_date, salary, role_id});

    return res.json({
        success: true,
        msg: "Empleado creado con exito."
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

employee.getEmployee = (req = Request, res = Response) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
