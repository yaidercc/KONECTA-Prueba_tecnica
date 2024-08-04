import { Link, NavLink } from "react-router-dom";

export const Navbar = ({ nameUser, role, logout }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
      <Link className="navbar-brand" to="/">
        {nameUser}
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `} to="/">
            Solicitudes
          </NavLink>
          {role === 2 ? (
            <NavLink className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `} to="/employees">
              Usuarios
            </NavLink>
          ) : null}
        </div>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <button className="nav-item nav-link btn" onClick={logout}>
            Salir
          </button>
        </ul>
      </div>
    </nav>
  );
};
