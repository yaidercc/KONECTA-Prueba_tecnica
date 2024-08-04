import { render } from "@testing-library/react"
import {SignIn } from "../../src/Auth/pages"
import { EmployeeContext } from "../../src/context/Employees/EmployeeContext";

describe('Pruebas en el componente de registro', () => { 
    test('Deben aparecer mensajes de error cuando se envian campos vacios', () => { 
        render(
            <EmployeeContext.Provider value={{ user: null }}>
              <SignIn />
            </EmployeeContext.Provider>
          );
     })
 })