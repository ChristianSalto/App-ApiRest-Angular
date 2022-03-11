const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUser = async (req, res = response) => {
  const { email, name, password } = req.body;

  try {
    // Verificar el email
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario con ese email ya existe",
      });
    }

    // Crear usuario con el modelo
    const dbUser = new User(req.body);

    // Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    // Generar el JWT
    const token = await generarJWT(dbUser.id, name);

    // Crear usuario de DB
    await dbUser.save();

    // Generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Crear usuario /new",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "El correo no existe",
      });
    }

    // Confirmar si el password hace match
    const validatorPass = bcrypt.compareSync(password, dbUser.password);

    if (!validatorPass) {
      return res.status(400).json({
        ok: false,
        msg: "El password no es valido",
      });
    }

    // Generar el JWT
    const token = await generarJWT(dbUser.id, dbUser.name);

    // Respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token,
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const revalidToken = (req, res = response) => {

  

  return res.json({
    ok: true,
    msg: "Renew",
    token
  });
};

module.exports = {
  crearUser,
  loginUser,
  revalidToken,
};
