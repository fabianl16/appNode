'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var Song = function(song){
  this.song_title       = song.song_title;
  this.year_launch      = song.year_launch;
  this.descripcion      = song.descripcion;
  this.tags             = song.tags;
  this.autor            = song.autor;
  this.imagen_cancion   = song.imagen_cancion;
  this.created_at       = new Date();
  this.updated_at       = new Date();
};
Song.create = function (newSong, imagen_cancion, result) {

dbConn.query(`INSERT INTO songs (song_title, year_launch, descripcion, tags, autor, imagen_cancion, created_at, updated_at) VALUES ( ${dbConn.escape(
  newSong.song_title
)},${dbConn.escape(
  newSong.year_launch
)},${dbConn.escape(
  newSong.descripcion
)}, ${dbConn.escape(
  newSong.tags
)},${dbConn.escape(
  newSong.autor
)}, ${dbConn.escape(
  imagen_cancion
)}, now(), now())`, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Song.findById = function (id_song, result) {
dbConn.query("Select * from songs where id_song = ? ", id_song, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Song.findAll = function (result) {
dbConn.query("Select * from songs", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('songs : ', res);
  result(null, res);
}
});
};
Song.update = function(id_song, song, result){
dbConn.query("UPDATE songs SET song_title=?,year_launch=?,descripcion=?,tags=?,autor=?,imagen_cancion=? WHERE id_song = ?", [song.song_title,song.year_launch,song.descripcion,song.tags,song.autor,song.imagen_cancion, id_song], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Song.delete = function(id_song, result){
dbConn.query("DELETE FROM songs WHERE id_song = ?", [id_song], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Song;