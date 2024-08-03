const requestServices = require("../services/request");
const { Op } = require("sequelize");
const requestControllers = {};
module.exports = requestControllers;

requestControllers.getRequest = async (req, res) => {
  try {
    const { page } = req.params;
    const { code, description, summary, employee } = req.query;
    const filters = {};

    if (code) filters.code = { [Op.iLike]: `%${code}%` };
    if (description) filters.description = { [Op.iLike]: `%${description}%` };
    if (summary) filters.summary = { [Op.iLike]: `%${summary}%` };
    if (employee) filters.employee_id = Number(employee);

    const offset = (page - 1) * 5;
    const requests = await requestServices.getRequests(offset, filters);

    const pages = await requestServices.getRequestsPages(filters);
    return res.json({
      success: true,
      requests: {
        requests,
        pages: pages <= 5 ? 1 : Math.round(pages / 5),
      },
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
      msg: "La solicitud fue creada con exito.",
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
    const { id } = req.params;
    console.log("holaa", id);

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
