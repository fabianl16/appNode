const Joi                       = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword               = Joi.extend(joiPasswordExtendCore);
module.exports = {
  validateRegister: (req, res, next) => {
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
  // foto_perfil: Joi.string()
  //             .optional(),
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