const { Router } = require("express");
const { check } = require("express-validator");
const { crearUser, loginUser, revalidToken } = require("../controllers/auth");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", revalidToken);

module.exports = router;
