const requestModel = require("../models/request.js");
const requestServices = {};
module.exports = requestServices;

requestServices.getRequests = (offset,filters) =>
  requestModel.findAll({
    limit: 10,
    offset,
    where: filters
  });

requestServices.createRequest = async (requestInfo) => requestModel.create(requestInfo);

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
