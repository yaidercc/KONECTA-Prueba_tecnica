import { signupSchema } from "../../helpers/formValidators";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { NavLink } from "react-router-dom";

export const SignIn = () => {
  const { name, join_date, salary, username, password, repeat_password, onInputChange, handleSetErrors, getErrorMessage } = useForm({
    name: "",
    join_date: "",
    salary: "",
    username: "",
    password: "",
    repeat_password: "",
  });

  const { Signup } = useAuth();
  const submitForm = async (event) => {
    try {
      event.preventDefault();
      await signupSchema.validate(
        {
          name,
          join_date,
          salary,
          username,
          password,
          repeat_password,
        },
        { abortEarly: false }
      );

      await Signup({
        name,
        join_date,
        salary,
        username,
        password,
      });
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };
  return (
    <div className="signin container-form">
      <form className="signin__form bg-light" onSubmit={submitForm}>
        <h2 className="mb-4 text-center">Registrarse</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input type="text" className="form-control" name="name" value={name} onChange={onInputChange} id="name" placeholder="Ingrese su usuario" />
          <div className="text-danger">{getErrorMessage("name")}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="join_date" className="form-label">
            Fecha ingreso
          </label>
          <input type="date" className="form-control" name="join_date" value={join_date} onChange={onInputChange} id="join_date" />
          <div className="text-danger">{getErrorMessage("join_date")}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salario
          </label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={salary}
            onChange={onInputChange}
            id="salary"
            placeholder="Ingrese su salario"
          />
          <div className="text-danger">{getErrorMessage("salary")}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={onInputChange}
            id="username"
            placeholder="Ingrese su usuario"
          />
          <div className="text-danger">{getErrorMessage("username")}</div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onInputChange}
              id="password"
              placeholder="Ingrese su clave"
            />
            <div className="text-danger">{getErrorMessage("password")}</div>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="repeat_password" className="form-label">
              Repita su contraseña
            </label>
            <input
              type="password"
              className="form-control"
              name="repeat_password"
              value={repeat_password}
              onChange={onInputChange}
              id="repeat_password"
              placeholder="Repita su clave"
            />
            <div className="text-danger">{getErrorMessage("repeat_password")}</div>
          </div>
        </div>
        <div className="d-flex align-center justify-content-center">
          <button type="submit" className="btn bg-success text-light">
            Ingresar
          </button>
        </div>

        <NavLink className="text-url" to="/auth/signin">
          Login
        </NavLink>
      </form>
    </div>
  );
};
