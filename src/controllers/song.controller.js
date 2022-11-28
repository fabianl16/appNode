'use strict';
const Song = require('../models/song.model');
exports.findAll = function(req, res) {
Song.findAll(function(err, song) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', song);
  res.send(song);
});
};
exports.create = function(req, res) {
const new_song = new Song(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Song.create(new_song, function(err, song) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Song added successfully!",data:song});
});
}
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