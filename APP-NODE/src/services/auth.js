const authModel = require("../models/auth");

const authServices = {};
module.exports = authServices;

authServices.createEmployeeLogin = async (employeeLoginInfo) => authModel.create(employeeLoginInfo);

authServices.login = async(username) =>
  authModel.findAll({
    where: {
      username,
    },
    
  });
