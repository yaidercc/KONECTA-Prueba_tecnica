const router = require("express").Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/auth");
const { validateFields } = require("../middlewares");
const validateJWT = require("../middlewares/validateJWT");

router.post("/login", [ 
    check("username", "el usuario es obligatorio").not().isEmpty(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validateFields
], authControllers.login);

router.get("/",validateJWT,authControllers.renewToken)

module.exports = router;
