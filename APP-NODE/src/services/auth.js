const authModel = require("../models/auth");
const authServices = {};
module.exports = authServices;

authServices.createEmployeeLogin = async (employeeLoginInfo) => {
  try {
    const findEmployeeLogin = await authModel.findAll({
      where: {
        user_id: employeeLoginInfo.user_id,
      },
    });

    if (findEmployeeLogin.length > 0) {
      throw new Error("El usuario ya tiene informacion de inicio de sesion")
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
