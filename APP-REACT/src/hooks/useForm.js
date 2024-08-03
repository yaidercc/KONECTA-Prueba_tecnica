import { useState } from "react";
export const useForm = (initialValue = {}) => {
  const [formState, setFormState] = useState(initialValue);
  const [errorFields, setErrorFields] = useState({});

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormState(initialValue);
  };

  const getErrorMessage = (fieldName) => {
    return errorFields[fieldName] || false;
  };

  const handleSetErrors = (errors) => {
    const newErrorFields = [];

    errors.forEach((err) => {
      const { path, message } = err;
      if (!newErrorFields[path]) {
        newErrorFields[path] = [];
      }
      newErrorFields[path].push(message);
    });

    const formattedErrors = Object.keys(newErrorFields).reduce((acc, key) => {
      acc[key] = newErrorFields[key].join(" ");
      if (key === "password") {
        acc[key] = "La clave debe ser de 8 digitos almenos una mayuscula y una minuscula y un numero";
      }
      return acc;
    }, {});
    setErrorFields(formattedErrors);
  };
  return {
    ...formState,
    formState,
    onInputChange,
    resetForm,
    errorFields,
    setErrorFields,
    getErrorMessage,
    handleSetErrors,
  };
};
