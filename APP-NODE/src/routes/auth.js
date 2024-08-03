const router = require("express").Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/auth");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");

router.post(
  "/createLogin",
  [
    check("user_id", "id del usuario es incorrecto").not().isEmpty(),
    check("username", "el usuario es incorrecto").not().isEmpty(),
    check("password", "la clave es incorrecta").not().isEmpty(),
    validateFields,
  ],
  authControllers.createEmployeeLogin
);

router.post("/login", [ 
    check("username", "el usuario es incorrecto").not().isEmpty(),
    check("password", "la clave es incorrecta").not().isEmpty(),
    validateFields
], authControllers.login);

router.get("/",validateJWT,authControllers.renewToken)

module.exports = router;
