const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    res.json({
      success: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    // Buscar si el usuario existe.

    const { id } = jwt.verify(token, process.env.SECRETKEY);
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(401).json({
        success: false,
        msg: "El empleado no existe",
      });
    }
    const { name, join_date, salary } = employee;

    req.employee = {name, join_date, salary};
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Token no valido",
    });
  }
};

module.exports = validateJWT;
