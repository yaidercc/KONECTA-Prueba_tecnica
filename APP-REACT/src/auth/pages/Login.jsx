import { Loader } from "../../ui/components/Loader/Loader";

export const Login = () => {

  const onSubmit = (event) => {

  }

  return (
    <div className="login container-form">
      <form className="login__form bg-light" onSubmit={onSubmit}>
        <h2 className="mb-4 text-center">Iniciar Sesion</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" id="password" placeholder="Ingrese su clave" />
        </div>
        <div className="d-flex align-center justify-content-center">
          <button type="submit" className="btn bg-success text-light">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};
