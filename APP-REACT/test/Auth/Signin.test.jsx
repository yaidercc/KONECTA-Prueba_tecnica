import { fireEvent, render, screen } from "@testing-library/react"
import { SignIn } from "../../src/Auth/pages"
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en el componente de registro', () => { 

  test("validar que este el texto de registro", () => {
    render(
      <MemoryRouter>
      <EmployeeContext.Provider value={{ employee: {}, setIsLoading: () => {} }}>
        <SignIn />
      </EmployeeContext.Provider>
    </MemoryRouter>
    );

    const loginTitle= screen.getByText(/Registrarse/i);
    
  
    expect(loginTitle).toBeTruthy();
  });
 })
