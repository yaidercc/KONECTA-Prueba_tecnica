import { lazy, useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../../context/Employees/EmployeeContext";
import { useRequests } from "../hooks";
import { RequestContext } from "../../context/Requests/RequestContext";
const Pagination = lazy(() => import("../components/Pagination"));
const Table = lazy(() => import("../components/Table"));
const ModalForm = lazy(() => import("../../ui/components/Modal/ModalForm"));

export const Requests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { employee } = useContext(EmployeeContext);
  const { requests: requestsObj } = useContext(RequestContext);
  const { requests, pages } = requestsObj;
  const { getRequests, deleteRequests } = useRequests();
  const countPages = Array.from({ length: pages }, (_, index) => index + 1);

  const handleDeleteRequest = (id) => {
    if (confirm("¿Seguro que deseas borrar este elememto?")) {
      deleteRequests(id);
    }
  };

  const handleSetCurrentPage = async (page) => {
    setCurrentPage(page);
    localStorage.setItem("page", page);
    await getRequests(page);
  };

  const paginationControls = (value) => {
    const total = Number(currentPage) + value;
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
      <h2 className="mt-3 ">Solicitudes</h2>
      <ModalForm />
      <hr />
      <Table handleDeleteRequest={handleDeleteRequest} requests={requests} role_id={employee.role_id} />
      <Pagination
        countPages={countPages}
        pages={pages}
        paginationControls={paginationControls}
        currentPage={currentPage}
        handleSetCurrentPage={handleSetCurrentPage}
      />
    </div>
  );
};
