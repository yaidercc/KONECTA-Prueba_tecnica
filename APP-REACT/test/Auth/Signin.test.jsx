import { fireEvent, render, screen, act } from "@testing-library/react";
import { SignIn } from "../../src/Auth/pages";
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en el componente de registro", () => {
  test("Deben aparecer mensajes de error cuando se envían campos vacíos", async () => {

      render(
        <MemoryRouter>
          <EmployeeContext.Provider value={{ user: null }}>
            <SignIn />
          </EmployeeContext.Provider>
        </MemoryRouter>
      );

      const form = screen.getByRole("form");
      fireEvent.submit(form);
      

      const error = await screen.findByText("El nombre es obligatorio");

      
      // Espera que los mensajes de error aparezcan
      expect(error).toBeInTheDocument();
   
  });
});
