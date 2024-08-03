jest.mock("../../models/request.js");
jest.mock("../../models/employee");
const requestModel = require("../../models/request");
const employeeModel = require("../../models/employee");
const requestServices = require("../../services/request");
/**
 * Validar que se elimina una solicitud existente
 * Validar que se devuelva un array vacio si no existen las solicitudes
 * Verificar que la solicitud se cree correctamente
 * Verificar que se lance un error si la solicitud no existe.
 */

describe("Pruebas en el modulo solicitudes", () => {
  test("Debe devolver el número de solicitudes con los filtros aplicados", async () => {
    const filters = { employee_id: 1 };
    const mockCount = 10;

    requestModel.count = jest.fn().mockResolvedValue(mockCount);

    const result = await requestServices.getRequestsPages(filters);

    expect(requestModel.count).toHaveBeenCalledWith({ where: filters });
    expect(result).toBe(mockCount);
  });

  test("Debe crear una solicitud y devolver los datos", async () => {
    const requestInfo = { code: "REQ003", description: "Solicitud de yaidercc" };
    const newRequest = { id: 1, ...requestInfo };

    requestModel.create = jest.fn().mockResolvedValue(newRequest);
    requestModel.findByPk = jest.fn().mockResolvedValue(newRequest);

    const result = await requestServices.createRequest(requestInfo);

    expect(requestModel.create).toHaveBeenCalledWith(requestInfo);
    expect(requestModel.findByPk).toHaveBeenCalledWith(newRequest.id, {
      include: { model: employeeModel, attributes: ["name"] },
    });
    expect(result).toEqual(newRequest);
  });
});

test("Debe lanzar un error si la solicitud no existe", async () => {
    const requestId = 1;
    requestModel.findByPk = jest.fn().mockResolvedValue(null);
  
    await expect(requestServices.deleteRequest(requestId)).rejects.toThrow("La solicitud no existe");
  });
  

test("Debe eliminar la solicitud si existe", async () => {
  const requestId = 1;
  const mockRequest = { id: requestId };

  requestModel.findByPk = jest.fn().mockResolvedValue(mockRequest);
  requestModel.destroy = jest.fn().mockResolvedValue(1); 

  const result = await requestServices.deleteRequest(requestId);

  expect(requestModel.findByPk).toHaveBeenCalledWith(requestId);
  expect(requestModel.destroy).toHaveBeenCalledWith({
    where: { id: requestId },
  });
  expect(result).toBe(1); 
});
