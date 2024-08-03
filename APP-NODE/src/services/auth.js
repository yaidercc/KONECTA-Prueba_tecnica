const employeeModel = require("../models/employee");
const authServices = {};
module.exports = authServices;

authServices.login = async (username) => {
  try {
    return await employeeModel.findAll({
      where: {
        username,
      },
      attributes: ["id", "username", "password","name","join_date","salary"],
    });
  } catch (error) {
    throw error;
  }
};
