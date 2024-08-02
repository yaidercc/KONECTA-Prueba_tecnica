export const SignIn = () => {
  return (
    <div className="signin container-form">
      <form className="signin__form bg-light">
        <h2 className="mb-4 text-center">Registrarse</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Fecha ingreso
          </label>
          <input type="date" className="form-control" id="username"/>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Salario
          </label>
          <input type="number" className="form-control" id="username" placeholder="Ingrese su salario" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input type="text" className="form-control" id="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" className="form-control" id="password" placeholder="Ingrese su clave" />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Repita su contraseña
            </label>
            <input type="password" className="form-control" id="password" placeholder="Repita su clave" />
          </div>
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
