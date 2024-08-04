const router = require("express").Router();
const { check } = require("express-validator");
const requestControllers = require("../controllers/request");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");
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
 * /api/request/{page}:
 *   get:
 *     summary: Obtener las solicitudes
 *     description: Obtienen las solicitudes paginadas
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: page
 *         in: path
 *         description: Número de página para la paginación
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - $ref: '#/components/parameters/TokenHeader'
 *     security:
 *       - TokenAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Solicitudes obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Estado de la respuesta
 *                 requests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       requests:
 *                         type: object
 *                       pages:
 *                         type: integer
 *       400:
 *         description: Error al obtener solicitudes
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
 *                   description: Errores de la petición
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



router.get("/:page", [validateJWT, validateFields], requestControllers.getRequest);

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
 * /api/request:
 *   post:
 *     summary: Crear una solicitud
 *     description: Crea una solicitud con los datos ingresados por el empleado
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - $ref: '#/components/parameters/TokenHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: El código de la solicitud
 *                 example: "RQ123"
 *               description:
 *                 type: string
 *                 description: Descripción de la solicitud
 *                 example: "Esta es la descripcion"
 *               summary:
 *                 type: string
 *                 description: Resumen de la solicitud
 *                 example: "Este es el resumen"
 *     security:
 *       - TokenAuth: []
 *     responses:
 *       200:
 *         description: Solicitud creada exitosamente
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
 *                   description: Mensaje de la petición
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
 *                 errors:
 *                   type: object
 *                   description: Errores de la petición
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
 * /api/request/{id}:
 *   delete:
 *     summary: Elimina una solicitud
 *     description: Elimina una solicitud del sistema utilizando su ID. Requiere autenticación mediante un token.
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la solicitud a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - $ref: '#/components/parameters/TokenHeader'
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente
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
 *         description: Solicitud no encontrada o no puedes eliminarte a ti mismo
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
router.delete(
  "/:id",
  [validateJWT, validateFields, isAdmin, validateFields, check("id", "el id de la solicitud es incorrecto").not().isEmpty(), validateFields],
  requestControllers.deleteRequest
);

module.exports = router;
