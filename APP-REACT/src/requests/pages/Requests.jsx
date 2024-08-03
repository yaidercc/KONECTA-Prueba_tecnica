import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import { Navbar } from "../../ui/components/NavBar/NavBar";
import { useRequests } from "../hooks/useRequests";
import { RequestContext } from "../../context/Requests/RequestContext";

export const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user, logout } = useContext(UserContext);
  const { requests: requestsObj } = useContext(RequestContext);
  const { requests, pages } = requestsObj;
  const { getRequests, deleteRequests } = useRequests();
  const countPages = Array.from({ length: pages }, (_, index) => index + 1);
  const handleDeleteRequest = (id) => {
    deleteRequests(id);
  };

  const handleSetCurrentPage = async (page) => {
    setCurrentPage(page);
    localStorage.setItem("page", page);

    await getRequests(page);
  };

  const paginationControls = (value) => {
    const total = Number(currentPage) + value;
    console.log(total);
    if (total <= pages && total >= 1) {
      setCurrentPage(total);
    }
  };

  useEffect(() => {
    const page = localStorage.getItem("page");
    handleSetCurrentPage(!page ? 1 : currentPage);
  }, [currentPage]);
  return (
    <div>
      <Navbar nameUser={user.name} logout={logout} />

      <h2 className="mt-3 ">Solicitudes</h2>
      <button className="btn btn-success">Crear Solicitud</button>
      <hr />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Codigo</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Resumen</th>
            <th scope="col">Empleado</th>
            {user.role_id === 1 || <th scope="col">Eliminar</th>}
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
              {user.role_id === 1 || (
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteRequest(item.id)}>
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage == 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginationControls(-1)}>
              Previous
            </button>
          </li>
          {countPages.map((item, i) => (
            <li className="page-item" key={i}>
              <button className={`page-link ${currentPage == item ? "active" : ""}`} onClick={() => handleSetCurrentPage(item)}>
                {item}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage == pages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginationControls(1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
