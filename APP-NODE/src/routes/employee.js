const router = require("express").Router();
const { check } = require("express-validator");
const employeeControllers = require("../controllers/employee");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @openapi
 * /api/employee/:
 *   post:
 *     summary: Crear un empleado
 *     description: Crea un nuevo empleado con la información proporcionada, incluyendo nombre, fecha de incorporación, salario, nombre de usuario y contraseña.
 *     tags:
 *       - Empleados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: "Juan Pérez"
 *               join_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de incorporación del empleado
 *                 example: "2024-08-04"
 *               salary:
 *                 type: integer
 *                 description: Salario del empleado
 *                 example: 50000
 *               role_id:
 *                 type: integer
 *                 description: Rol del empleado
 *                 example: 1
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del empleado
 *                 example: "juanperez"
 *               password:
 *                 type: string
 *                 description: Contraseña del empleado
 *                 example: "contraseñaSegura123"
 *     responses:
 *       200:
 *         description: Empleado creado exitosamente
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
 *                   description: Mensaje de confirmación
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 error:
 *                   type: string
 *                   description: Descripción del error
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
 * components:
 *   securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: x-token
 *   parameters:
 *     TokenHeader:
 *       name: x-token
 *       in: header
 *       required: true
 *       schema:
 *         type: string
 *         description: Token de autenticación
 * /api/employee/getAllEmployees:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Recupera la lista completa de empleados en el sistema. Requiere autenticación mediante un token.
 *     tags:
 *       - Empleados
 *     parameters:
 *       - $ref: '#/components/parameters/TokenHeader'
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del empleado
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre del empleado
 *                         example: "Juan Pérez"
 *                       join_date:
 *                         type: string
 *                         format: date
 *                         description: Fecha de incorporación del empleado
 *                         example: "2024-08-04"
 *                       salary:
 *                         type: integer
 *                         description: Salario del empleado
 *                         example: 50000
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */

router.get("/getAllEmployees", [
    validateJWT,
    validateFields
], employeeControllers.getAllEmployees);

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: x-token
 *   parameters:
 *     TokenHeader:
 *       name: x-token
 *       in: header
 *       required: true
 *       schema:
 *         type: string
 *         description: Token de autenticación
 * /api/employee/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     description: Elimina un empleado del sistema usando su ID. Requiere autenticación mediante un token. No se puede eliminar el propio usuario.
 *     tags:
 *       - Empleados
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del empleado a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - $ref: '#/components/parameters/TokenHeader'
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
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
 *                   description: Mensaje de confirmación
 *       400:
 *         description: No puedes eliminarte a ti mismo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 error:
 *                   type: string
 *                   description: Descripción del error
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
 *   get:
 *     summary: Obtiene todos los roles
 *     description: Recupera una lista de todos los roles disponibles en el sistema. Requiere autenticación mediante un token.
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Roles obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Nombre de un rol
 *                     example: "admin"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 error:
 *                   type: string
 *                   description: Descripción del error
 */

router.get("/getRoles", employeeControllers.getRoles)



module.exports = router;
