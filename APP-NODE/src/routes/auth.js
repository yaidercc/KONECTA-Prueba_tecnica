const router = require("express").Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/auth");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Loguear usuario
 *     description: Login con el usuario
 *     tags:
 *       - Auth
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
 *                 description: El nombre de usuario
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
 *       500:
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
router.post("/login", [ 
    check("username", "el usuario es obligatorio").not().isEmpty(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validateFields
], authControllers.login);


/**
 * @openapi
 * /api/auth:
 *   get:
 *     summary: Obtener flashcard
 *     description: Renovar token
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: topic
 *         in: path
 *         required: true
 *         description: Id de la flashcard a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Mensaje de la peticion
 *       500:
 *          description: 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Estado de la peticion
 *                  msg:
 *                    type: string
 *                    description: Errores del servidor
 */
router.get("/",validateJWT,authControllers.renewToken)

module.exports = router;
