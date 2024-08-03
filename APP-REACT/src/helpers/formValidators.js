import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("El usuario o la clave son invalidos"),
  password: yup.string().required("El usuario o la clave son invalidos"),
});

export const signupSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),  
  join_date: yup.date().required("La fecha de ingreso es obligatoria").typeError("La fecha de ingreso debe ser una fecha válida"),  
  salary: yup.number().positive("El salario debe ser un número positivo").typeError("El salario es obligatorio"),
  username: yup.string().required("El nombre de usuario es obligatorio"),  
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/\d/, "Debe contener al menos un número")
    .required("La contraseña es obligatoria"),
    repeat_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")  // Asegura que repita la misma contraseña
});
