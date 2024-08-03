const requestModel = require("../models/request.js");
const employeeModel = require("../models/employee.js");
const requestServices = {};
module.exports = requestServices;

requestServices.getRequests = (offset, filters) =>
  requestModel.findAll({
    limit: 5,
    offset,
    where: filters,
    include: {
      model: employeeModel,
      attributes: ["name"],
    },
    order: [['id', 'DESC']]
  });

requestServices.getRequestsPages = (filters) =>
  requestModel.count({
    where: filters,
  });

requestServices.createRequest = async (requestInfo) => {
  const newRequest = await requestModel.create(requestInfo);
  return await requestModel.findByPk(newRequest.id, {
    include: {
      model: employeeModel,
      attributes: ["name"],
    },
  });
};

requestServices.deleteRequest = async (id) => {

  const findRequest = await requestModel.findByPk(id);
  if (!findRequest) {
    throw new Error("La solicitud no existe");
  }
  return requestModel.destroy({
    where: {
      id,
    },
  });
};
