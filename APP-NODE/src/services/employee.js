const employeeModel = require("../models/employee");
const roleModel = require("../models/roles");

const employeeServices = {};
module.exports = employeeServices;

employeeServices.createEmployee = async ( EmployeeInfo ) => {
    // Validar que el rol exista
    const validateRole = await roleModel.findByPk(EmployeeInfo.role_id);
    if (!validateRole) throw new Error("El rol ingresado no existe");
    return employeeModel.create(EmployeeInfo);
};

employeeServices.getEmployee = async(id) => employeeModel.findByPk(id);

