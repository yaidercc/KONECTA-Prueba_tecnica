const router = require("express").Router();
const { check } = require("express-validator");
const employeeControllers = require("../controllers/employee");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @openapi
 * /api/employee/login:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Empleados
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: Error al loguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 errors:
 *                   type: object
 *                   description: Errores de la peticion
 */
router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("join_date", "La fecha de ingreso es obligatoria").isDate(),
    check("join_date", "La fecha de ingreso es obligatoria").not().isEmpty(),
    check("salary", "El salario es obligatorio").not().isEmpty(),
    check("username", "el usuario es obligatorio").not().isEmpty(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validateFields
], employeeControllers.createEmployee);

/**
 * @openapi
 * /api/employee/getAllEmployees:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Empleados
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: Error al loguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 errors:
 *                   type: object
 *                   description: Errores de la peticion
 */
router.get("/getAllEmployees", [
    validateJWT,
    validateFields
], employeeControllers.getAllEmployees);

/**
 * @openapi
 * /api/employee/deleteUser:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Empleados
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: Error al loguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 errors:
 *                   type: object
 *                   description: Errores de la peticion
 */
router.delete("/:id",[
    validateJWT,
    validateFields,
    isAdmin,
    validateFields
],employeeControllers.deleteEmployee)

/**
 * @openapi
 * /api/employee/getRoles:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Empleados
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *                 example: "user"
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 msg:
 *                   type: string
 *                   description: Mensaje de la peticion
 *       400:
 *         description: Error al loguear usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 errors:
 *                   type: object
 *                   description: Errores de la peticion
 */
router.get("/getRoles", employeeControllers.getRoles)



module.exports = router;
