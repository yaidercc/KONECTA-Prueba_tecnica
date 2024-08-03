const authServices = require("../services/auth");
const bycryptjs = require("bcryptjs");
const generateJWT = require("../utils/generate-jwt");

const authControllers = {};
module.exports = authControllers;

authControllers.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [employee] = await authServices.login(username);

    if (!employee) {
      return res.status(400).json({
        success: false,
        mgs: "EL usuario o la clave es incorrecto",
      });
    }
    const validPassword = bycryptjs.compareSync(password, employee.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "EL usuario o la clave es incorrecto",
      });
    }

    const token = await generateJWT(employee.id);

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
      error: error.message,
    });
  }
};

authControllers.renewToken = async (req,res) => {
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
      error: error.message,
    });
  }
};
