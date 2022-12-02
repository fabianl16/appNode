'use strict';
const Song = require('../models/song.model');
const cloudinary                = require("../../cloudinary");
const Joi                       = require('joi');
exports.findAll = function(req, res) {
Song.findAll(function(err, song) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', song);
  res.send(song);
});
};
exports.create = async function(req, res) {
const new_song = new Song(req.body);
const upload      = await cloudinary.v2.uploader.upload(req.file.path);
const imagen_cancion = upload.secure_url;
const data        = req.body;
const {error}     = songSchema.validate(data);
if(error){
    return res.status(400).json({
        message: error.details[0].message
     });
}
Song.create(new_song, imagen_cancion, function(err, song) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Song added successfully!",data:song});
});

};
exports.findById = function(req, res) {
Song.findById(req.params.id, function(err, song) {
  if (err)
  res.send(err);
  res.json(song);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Song.update(req.params.id, new Song(req.body), function(err, song) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Song successfully updated' });
});
}
};
exports.delete = function(req, res) {
Song.delete( req.params.id, function(err, Song) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Song successfully deleted' });
});
};

const songSchema = Joi.object({
  song_title: Joi.string()
              .min(3)
              .max(30)
              .required(),
  year_launch: Joi.string()
                  .min(4)
                  .max(4)
                  .required(), 
  descripcion: Joi.string()
                  .min(5)
                  .max(100)
                  .required(),     
  autor: Joi.string()
                  .min(4)
                  .max(30)
                  .required(),  
  tags: Joi.string()
                  .min(4)
                  .max(30)
                  .required()  
});