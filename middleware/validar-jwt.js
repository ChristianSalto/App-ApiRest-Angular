



const validarJWT = (req,res = response,next) => {

  const token = req.header('x-token')


  if( !token ){
    return res.status(401).json({
      ok:true,
      msg:'Error en el token'
    })
  }


    // TODO OK
    next();
}



module.exports = {
    validarJWT
}