const authServices = require("../services/auth");
const employeeServices = require("../services/employee");
const bycryptjs = require("bcryptjs");
const generateJWT = require("../utils/generate-jwt");

const authControllers = {};
module.exports = authControllers;

authControllers.createEmployeeLogin = async (req, res) => {
  try {
    const { user_id, username, password } = req.body;

    // Encriptar la clave
    const salt = bycryptjs.genSaltSync();
    const encriptedPassword = bycryptjs.hashSync(password, salt);

    await authServices.createEmployeeLogin({ user_id, username, password: encriptedPassword });

    return res.json({
      success: true,
      msg: "empleado autenticado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

authControllers.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [employeeAuth] = await authServices.login(username);

    if (!employeeAuth) {
      return res.status(400).json({
        success: false,
        mgs: "EL usuario o la clave es incorrecto",
      });
    }
    const validPassword = bycryptjs.compareSync(password, employeeAuth.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "EL usuario o la clave es incorrecto",
      });
    }

    const token = await generateJWT(employeeAuth.user_id);

    const employee = await employeeServices.getEmployee(employeeAuth.user_id);

    return res.json({
      success: true,
      employee: {
        name: employee.name,
        join_date: employee.join_date,
        salary: employee.salary,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

authControllers.renewToken = async () => {
  try {
    const { employee } = req;

    const token = await generateJWT(employee.id);

    return res.json({
      employee,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
