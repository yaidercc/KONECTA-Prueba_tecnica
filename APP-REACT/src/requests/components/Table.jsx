import { useEffect, useState } from "react";
import { useRequests } from "../hooks/useRequests";
import { getEmployees } from "../helpers/getEmployees";

export const Table = ({ role_id, handleDeleteRequest, requests }) => {
  const [filters, setFilters] = useState({ code: "", summary: "", description: "", employee: 0 });
  const [employees, setEmployees] = useState([]);
  const { code, summary, description, employee } = filters;
  const { getRequests } = useRequests();

  const onInputChange = async ({ target }) => {
    const { name, value } = target;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      const filtersToSend = Object.entries(updatedFilters)
        .filter(([key, val]) => val !== "" && val != null && val !== 0 && val !== "0")
        .reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {});
        
      getRequests(1, filtersToSend);

      return updatedFilters;
    });
  };

  const handleGetEmployee = async () => {
    const response = await getEmployees();
    const { employees } = response.data;
    setEmployees(employees);
  };

  useEffect(() => {
    handleGetEmployee();
    
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Codigo</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Resumen</th>
          <th scope="col">Empleado</th>
          <th scope="col">{role_id === 2 ? "Eliminar" : null}</th>
        </tr>
        <tr>
          <th scope="col"></th>
          <th scope="col">
            <input type="text" name="code" className="form-control" placeholder="Buscar por codigo  " value={code} onChange={onInputChange} />
          </th>
          <th scope="col">
            <input
              type="text"
              name="summary"
              className="form-control"
              placeholder="Buscar por descripcion"
              value={summary}
              onChange={onInputChange}
            />
          </th>
          <th scope="col">
            <input
              type="text"
              name="description"
              className="form-control"
              placeholder="Buscar por resumen"
              value={description}
              onChange={onInputChange}
            />
          </th>
          <th scope="col">
            <select className="form-select" name="employee" value={employee} onChange={onInputChange}>
              <option value={0}>Todos</option>
              {employees.map((item, i) => (
                <option value={item.id} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {requests.map((item, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{item.code}</td>
            <td>{item.description}</td>
            <td>{item.summary}</td>
            <td>{item.Employee.name}</td>
            <td>
              {role_id == 2 ? (
                <button className="btn btn-danger" onClick={() => handleDeleteRequest(item.id)}>
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
