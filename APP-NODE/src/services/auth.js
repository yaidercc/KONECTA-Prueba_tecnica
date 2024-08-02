const authModel = require("../models/auth");
const authServices = {};
module.exports = authServices;

authServices.createEmployeeLogin = async (employeeLoginInfo) => {
  try {
    const findEmployeeLoginById = await authModel.findAll({
      where: {
        user_id: employeeLoginInfo.user_id,
      },
    });

    if (findEmployeeLoginById.length > 0) {
      throw new Error("El empleado ya tiene informacion de inicio de sesion")
    }

    const findEmployeeLoginByUser = await authModel.findAll({
      where: {
        user_id: employeeLoginInfo.user_id,
      },
    });

    if (findEmployeeLoginByUser.length > 0) {
      throw new Error("El nombre de usuario ya existe")
    }
    
    return await authModel.create(employeeLoginInfo);
  } catch (error) {
    throw error;
  }
};

authServices.login = async (username) => {
  try {
    return await authModel.findAll({
      where: {
        username,
      },
      attributes: ["id", "username", "password", "user_id"],
    });
  } catch (error) {
    throw error;
  }
};
