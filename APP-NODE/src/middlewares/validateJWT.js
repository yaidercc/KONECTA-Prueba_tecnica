const jwt = require("jsonwebtoken");
const Employee = require("../models/employee");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.json({
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
    const { name, join_date, salary, role_id } = employee;

    req.employee = { id, name, join_date, salary, role_id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Token no valido",
    });
  }
};

module.exports = validateJWT;
