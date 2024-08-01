const employeeModel = require("../models/employee");

const employeeServices = {}
module.exports = employeeServices;


employeeServices.createEmployee = async ( EmployeeInfo ) => employeeModel.create(EmployeeInfo);


employeeServices.getEmployee = () => {
   
}
