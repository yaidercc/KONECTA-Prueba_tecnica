const requestServices = require("../services/request");
const requestControllers = {};
module.exports = requestControllers;

requestControllers.getRequest = async (req, res) => {
  try {
    const { page } = req.params;
    const offset = (page - 1) * 10;
    const requests = await requestServices.getRequests(offset);
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
