import { useContext  } from "react";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";
import { useEmployees } from "../hooks/useEmployees";

export const TableUsers = ({ handleDeleteEmployee, handleUpdateEmployee }) => {
  const {employees,employee} = useContext(EmployeeContext);
  const {getEmployees} = useEmployees()

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Fecha de ingreso</th>
          <th scope="col">Salario</th>
          <th scope="col">Tipo usuario</th>
          <th scope="col">{employee.role_id === 2 ? "Editar" : null}</th>
          <th scope="col">{employee.role_id === 2 ? "Eliminar" : null}</th>
        </tr>

      </thead>
      <tbody>
        {employees.map((item, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.name}</td>
            <td>{item.join_date}</td>
            <td>$ {item.salary}</td>
            <td>{item.Role.name}</td>
            <td>
              {employee.role_id == 2 ? (
                <button className="btn btn-primary" onClick={() => handleDeleteUser(item.id)}>
                  Editar
                </button>
              ) : null}
            </td>
            <td>
              {employee.role_id == 2 ? (
                <button className="btn btn-danger" onClick={() => handleUpdateUser(item.id)}>
                  Eliminar
                </button>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
