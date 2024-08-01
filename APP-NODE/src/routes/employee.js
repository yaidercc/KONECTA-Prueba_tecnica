const router = require("express").Router();
const { check } = require("express-validator");
const employeeControllers = require("../controllers/employee");
const { validateFields } = require("../middlewares");


/**
 * @openapi
 * /api/employee:
 *   post:
 *     summary: Crear empleados
 *     description: Endpoint para crear un empleado
 *     tags:
 *       - Empleados
 *     produces:
 *        - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  name:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "juan"
 *                  join_date:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "andres"
 *                  salary:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "arboleda"
 *                  role_id:
 *                   required: true
 *                   type: string
 *                   description: El correo electrónico del usuario
 *                   example: "perez"
 *     
 */
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
