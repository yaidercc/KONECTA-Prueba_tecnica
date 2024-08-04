const router = require("express").Router();
const { check } = require("express-validator");
const requestControllers = require("../controllers/request");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @openapi
 * /api/requests/getRequests:
 *   post:
 *     summary: Obtener las solicitudes
 *     description: Obtienen las solicitudes paginadas
 *     tags:
 *       - Solicitudes
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
router.get("/:page", [validateJWT, validateFields], requestControllers.getRequest);

/**
 * @openapi
 * /api/requests/createRequests:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Solicitudes
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
router.post(
  "/",
  [
    validateJWT,
    validateFields,
    check("code", "el codigo de la solicitud es incorrecto").not().isEmpty(),
    check("description", "la descripcion de la solicitud es incorrecta").not().isEmpty(),
    check("summary", "el resumen de la solicitud es incorrecto").not().isEmpty(),
    validateFields,
  ],
  requestControllers.createRequest
);
/**
 * @openapi
 * /api/requests/deleteRequests:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Solicitudes
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
router.delete(
  "/:id",
  [validateJWT, validateFields, isAdmin, validateFields, check("id", "el id de la solicitud es incorrecto").not().isEmpty(), validateFields],
  requestControllers.deleteRequest
);

module.exports = router;
