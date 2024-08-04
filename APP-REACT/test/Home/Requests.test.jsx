import { MemoryRouter } from "react-router-dom";
import { Requests } from "../../src/Home/pages/Requests.jsx";
import { fireEvent, render, screen } from "@testing-library/react";
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext.jsx";
import { RequestContext } from "../../src/context/Requests/RequestContext.jsx";
// import {} from "rea"
describe("Pruebas en el componente de requests", () => {
  test("Validar que al dar click en el boton de crear solicitud", () => {
    render(
      <MemoryRouter>
        <EmployeeContext.Provider value={{ user: null }}>
          <RequestContext.Provider value={{ user: null }}>
            <Requests />
          </RequestContext.Provider>
        </EmployeeContext.Provider>
      </MemoryRouter>
    );
  });
});
