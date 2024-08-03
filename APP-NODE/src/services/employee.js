const employeeModel = require("../models/employee");
const roleModel = require("../models/roles");

const employeeServices = {};
module.exports = employeeServices;

employeeServices.createEmployee = async (EmployeeInfo) => {
  try {
    // Validar que el rol exista
    const validateRole = await roleModel.findByPk(EmployeeInfo.role_id);
    if (!validateRole) throw new Error("El rol ingresado no existe");

    const findEmployeeByUser = await employeeModel.findAll({
      where: {
        username: EmployeeInfo.username,
      },
    });

    if (findEmployeeByUser.length > 0) {
      throw new Error("El nombre de usuario ya existe");
    }

    return employeeModel.create(EmployeeInfo);
  } catch (error) {
    throw error;
  }
};

employeeServices.getEmployee = async (id) => await employeeModel.findByPk(id);

employeeServices.getRoles = async () => await roleModel.findAll({
  attributes:["id","name"]
});

employeeServices.deleteEmployee = async (id) =>{
  const findEmployee = await employeeModel.findByPk(id);
  if (!findEmployee) {
    throw new Error("El empleado no existe");
  }
  return employeeModel.destroy({
    where: {
      id,
    },
  });
}
  

employeeServices.getAllEmployees = async () =>
  await employeeModel.findAll({
    include: {
      model: roleModel,
      attributes: ["name"],
    },
  });
