'use strict';
const User = require('../models/user.model');
const cloudinary = require("../../cloudinary");
const Joi                       = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword               = Joi.extend(joiPasswordExtendCore);
exports.login = async function (req, res, next) {
    const data        = req.body;
    const {error}     = loginSchema.validate(data);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
         });
    }
    User.logIn(req, res, next);
};
exports.signUp = async function(req, res, next) {
    const upload      = await cloudinary.v2.uploader.upload(req.file.path);
    const foto_perfil = upload.secure_url;
    const data        = req.body;
    const {error}     = signUpSchema.validate(data);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
         });
    }
    User.create(req, foto_perfil, res, next);
};

const signUpSchema = Joi.object({
  nombre_usuario: Joi.string()
              .alphanum()
              .min(3)
              .max(30)
              .required(),  
  email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
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
const loginSchema = Joi.object({
  email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),  
  contrasena: joiPassword
          .string()
          .minOfNumeric(2)
          .noWhiteSpaces()
          .required()
});