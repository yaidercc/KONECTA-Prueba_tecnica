import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import { Navbar } from "../../ui/components/NavBar/NavBar";
import { useRequests } from "../hooks/useRequests";
import { RequestContext } from "../../context/Requests/RequestContext";
import { Pagination } from "../components";
import { Table } from "../components/Table";

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

      <Table handleDeleteRequest={handleDeleteRequest} requests={requests} role_id={user.role_id} />
      <Pagination countPages={countPages} pages={pages} paginationControls={paginationControls} currentPage={currentPage} handleSetCurrentPage={handleSetCurrentPage} />
    </div>
  );
};
