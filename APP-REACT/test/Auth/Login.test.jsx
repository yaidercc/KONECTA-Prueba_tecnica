import { fireEvent, render, screen } from "@testing-library/react";
import { Login, SignIn } from "../../src/Auth/pages";
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en el componente de login", () => {
  test("Deben aparecer mensajes de error cuando se envian campos vacios", async () => {
    render(
      <MemoryRouter>
        <EmployeeContext.Provider value={{ employee: {}, setIsLoading: () => {} }}>
          <Login />
        </EmployeeContext.Provider>
      </MemoryRouter>
    );

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    const errorMessages = screen.getAllByText("Debes completar este campo.");
    expect(errorMessages.length).toBe(2);
  });
  test("validar que este el texto de inicio de sesion", () => {
    render(
      <MemoryRouter>
      <EmployeeContext.Provider value={{ employee: {}, setIsLoading: () => {} }}>
        <Login />
      </EmployeeContext.Provider>
    </MemoryRouter>
    );
    screen.debug()

    const loginTitle= screen.getByText(/iniciar sesion/i);
    
  
    expect(loginTitle).toBeTruthy();
  });

 
});
