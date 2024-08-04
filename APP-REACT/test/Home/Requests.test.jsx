import { MemoryRouter } from "react-router-dom";
import { Requests } from "../../src/Home/pages/Requests.jsx";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext.jsx";
import { RequestContext } from "../../src/context/Requests/RequestContext.jsx";


describe("Pruebas en el componente de requests", () => {
  test("Validar que al dar click en el boton de crear solicitud", async () => {
    const jsdomAlert = window.alert;  // remember the jsdom alert
  window.alert = () => {};  // provide an empty implementation for window.alert
    await act(async () => {
      render(
        <MemoryRouter>
          <EmployeeContext.Provider value={{ employee: {} }}>
            <RequestContext.Provider value={{ requests: { requests: [] } }}>
              <Requests />
            </RequestContext.Provider>
          </EmployeeContext.Provider>
        </MemoryRouter>
      );

      screen.debug()
    //   console.log(btn);
    });
  });
});
