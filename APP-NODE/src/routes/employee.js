const router = require("express").Router();
const { check } = require("express-validator");
const employeeControllers = require("../controllers/employee");
const { validateFields } = require("../middlewares");

router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("join_date", "La fecha de ingreso es obligatoria").isDate(),
    check("join_date", "La fecha de ingreso es obligatoria").not().isEmpty(),
    check("salary", "El salario es obligatorio").not().isEmpty(),
    check("role_id", "El rol es obligatorio").not().isEmpty(),
    validateFields
], employeeControllers.createEmployee);

router.get("/:id", [
    check("id","el id del empleado es obligatorio").not().isEmpty(),
    validateFields
], employeeControllers.getEmployee);

module.exports = router;
