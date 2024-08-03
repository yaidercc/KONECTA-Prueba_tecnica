const router = require("express").Router();
const { check } = require("express-validator");
const employeeControllers = require("../controllers/employee");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");


router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("join_date", "La fecha de ingreso es obligatoria").isDate(),
    check("join_date", "La fecha de ingreso es obligatoria").not().isEmpty(),
    check("salary", "El salario es obligatorio").not().isEmpty(),
    check("username", "el usuario es obligatorio").not().isEmpty(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validateFields
], employeeControllers.createEmployee);

router.get("/getAllEmployees", [
    validateJWT,
    validateFields
], employeeControllers.getAllEmployees);

router.delete("/:id",[
    validateJWT,
    validateFields,
    isAdmin,
    validateFields
],employeeControllers.deleteEmployee)

router.get("/getRoles", employeeControllers.getRoles)



module.exports = router;
