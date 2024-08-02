const router = require("express").Router();
const { check } = require("express-validator");
const requestControllers = require("../controllers/request");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const isAdmin = require("../middlewares/isAdmin");

router.get("/:page", [validateJWT, validateFields], requestControllers.getRequest);

router.post(
  "/",
  [
    validateJWT,
    validateFields,
    isAdmin,
    validateFields,
    check("code", "el codigo de la solicitud es incorrecto").not().isEmpty(),
    check("description", "la descripcion de la solicitud es incorrecta").not().isEmpty(),
    check("summary", "el resumen de la solicitud es incorrecto").not().isEmpty(),
    validateFields,
  ],
  requestControllers.createRequest
);
router.delete(
  "/:id",
  [validateJWT, validateFields, isAdmin, validateFields, check("id", "el id de la solicitud es incorrecto").not().isEmpty(), validateFields],
  requestControllers.deleteRequest
);

module.exports = router;
