import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRequests } from "../../../Home/hooks";
import { useForm } from "../../../hooks/useForm";

const ModalForm = () => {
  const [show, setShow] = useState(false);
  const { createRequests } = useRequests();
  const { code, description, summary, onInputChange, getErrorMessage, setErrorFields, errorFields,resetForm } = useForm({
    code: "",
    description: "",
    summary: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!code.trim() || !description.trim() || !summary.trim()) {
        const errors = {};
        if (!code.trim()) {
          errors["code"] = "Debes completar este campo.";
        }
        if (!description.trim()) {
          errors["description"] = "Debes completar este campo.";
        }
        if (!summary.trim()) {
          errors["summary"] = "Debes completar este campo.";
        }
        setErrorFields({ ...errorFields, ...errors });
        return;
      }
      await createRequests({ code, description, summary });
      resetForm()
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Crear solicitud
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login__form needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Codigo
              </label>
              <input
                type="text"
                className="form-control"
                name="code"
                id="code"
                placeholder="Ingrese el codigo de sus solicitud"
                value={code}
                onChange={onInputChange}
                required
              />
              <div className="text-danger">{getErrorMessage("code")}</div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Descripcion
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  style={{ height: "100px", resize: "none" }}
                ></textarea>
                <label htmlFor="description">Ingrese su descripcion</label>
                <div className="text-danger">{getErrorMessage("description")}</div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Resumen
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="summary"
                  name="summary"
                  value={summary}
                  onChange={onInputChange}
                  style={{ height: "100px", resize: "none" }}
                ></textarea>
                <label htmlFor="summary">Ingrese su resumen</label>
                <div className="text-danger">{getErrorMessage("summary")}</div>
              </div>
            </div>

            <div className="d-flex align-center justify-content-center">
              <button className="btn bg-success text-light" type="submit">
                Ingresar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalForm;