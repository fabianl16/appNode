'use strict';
const User                      = require('../models/user.model');
const cloudinary                = require("../../cloudinary");
const Joi                       = require('joi');
exports.findAll = function(req, res) {
User.findAll(function(err, song) {
  if (err)
  res.send(err);
  console.log('res', song);
  res.send(song);
});
};
exports.findById = function(req, res) {
    User.findById(req.params.id, function(err, tag) {
  if (err)
  res.send(err);
  res.json(tag);
});
};
exports.update = async function(req, res, next) {
const data        = req.body;
const {error}     = updateSchema.validate(data);
if(error){
    return res.status(400).json({
        message: error.details[0].message
     });
}
const upload      = await cloudinary.v2.uploader.upload(req.file.path);
const foto_perfil = upload.secure_url;
    User.update(req.params.id, new User(req.body), foto_perfil, function(err, usuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'User successfully updated' });
});

};
exports.delete = function(req, res) {
  User.delete(req.params.id, function(err, Usuario) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Usuario successfully deleted' });
  });
};
const updateSchema = Joi.object({
    nombre_usuario: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
});