const { response } = require("express");


const crearUser = (req, res = response) => {

  const { email, name, password } = req.body;

  return res.json({
    ok: true,
    msg: "Crear usuario /new",
  });
};

const loginUser = (req, res = response) => {

  const { email, password } = req.body;


  return res.json({
    ok: true,
    msg: "Login de usuario /",
  });
};

const revalidToken = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = {
  crearUser,
  loginUser,
  revalidToken,
};
