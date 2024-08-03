import { loginSchema } from "../../helpers/formValidators";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { username, password, onInputChange, getErrorMessage, handleSetErrors, setErrorFields, errorFields } = useForm({
    username: "",
    password: "",
  });

  const { Login } = useAuth();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
        const errors = {};
        if (!password.trim()) {
          errors["password"] = "Debes completar este campo.";
        }
        if (!username.trim()) {
          errors["username"] = "Debes completar este campo.";
        }
        setErrorFields({ ...errorFields, ...errors });
        return;
      }
      await loginSchema.validate({ username, password }, { abortEarly: false });
      await Login({ username, password });
    } catch (error) {
      if (error.name === "ValidationError") handleSetErrors(error.inner);
      else throw error;
    }
  };

  return (
    <div className="login container-form">
      <form className="login__form bg-light needs-validation" onSubmit={submitForm} noValidate>
        <h2 className="mb-4 text-center">Iniciar Sesion</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={onInputChange}
            required
          />
          <div className="text-danger">{getErrorMessage("username")}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Ingrese su clave"
            value={password}
            onChange={onInputChange}
            required
          />
          <div className="text-danger">{getErrorMessage("password")}</div>
        </div>
        <div className="d-flex align-center justify-content-center">
          <button className="btn bg-success text-light" type="submit">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};
