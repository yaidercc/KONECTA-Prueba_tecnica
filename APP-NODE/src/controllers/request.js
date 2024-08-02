const requestServices = require("../services/request");
const { Op } = require("sequelize");
const requestControllers = {};
module.exports = requestControllers;

requestControllers.getRequest = async (req, res) => {
  try {
    const { page } = req.params;
    const { code, description, summary } = req.query;
    const filters = {};
    
    
    if (code) filters.code = { [Op.iLike]: `%${code}%` };
    if (description) filters.description = { [Op.iLike]: `%${description}%` };
    if (summary) filters.summary = { [Op.iLike]: `%${summary}%` };


    const offset = (page - 1) * 10;
    const requests = await requestServices.getRequests(offset,filters);
    return res.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

requestControllers.createRequest = async (req, res) => {
  try {
    const { body, employee } = req;
    const { code, description, summary } = body;
    const { id } = employee;

    const request = await requestServices.createRequest({ code, description, summary, employee_id: id });

    return res.json({
      success: true,
      mgs: "La solicitud fue creada con exito.",
      request,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

requestControllers.deleteRequest = async (req, res) => {
  try {
    const { id } = req.employee;
    await requestServices.deleteRequest(id);

    return res.json({
      success: true,
      mgs: "La solicitud fue eliminada con exito.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
