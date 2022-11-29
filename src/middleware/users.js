const Joi                       = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword               = Joi.extend(joiPasswordExtendCore);
const multiparty                = require('multiparty');
const cloudinary        = require("../../cloudinary");
module.exports = {
  validateRegister: async (req, res, next) => {
    let form = new multiparty.Form();
    let x = null;
    form.parse(req, function(err, fields, files) {
      // Object.keys(fields).forEach(function(name) {
      //      console.log('got field named ' + name);
      //  });
      x = {
        "nombre_usuario":fields.nombre_usuario[0],
        "email":fields.email[0],
        "foto_perfil":fields.foto_perfil,
        "contrasena":fields.contrasena[0],
        "contrasena_repeat":fields.contrasena_repeat[0]
      }
      // console.log(fields.nombre_usuario);
      console.log(x);
   });
    const data = req.body;
    const {error} = schema.validate(data);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
         });
    }
    next();
  }
};

const schema = Joi.object({
  nombre_usuario: Joi.string()
              .alphanum()
              .min(3)
              .max(30)
              .required(),  
  email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  foto_perfil: Joi.string()
          .min(3)
          .max(250)
          .required(),
  contrasena: joiPassword
          .string()
          .minOfNumeric(2)
          .noWhiteSpaces()
          .required(),
  contrasena_repeat: joiPassword
          .string()
          .minOfNumeric(2)
          .noWhiteSpaces()
          .required()
});