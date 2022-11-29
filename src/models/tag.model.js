'use strict';
var dbConn = require('./../../config/db.config');
//Tag object create
var Tag = function(tag){
  this.nombre_tag       = tag.nombre_tag;
  this.created_at       = new Date();
  this.updated_at       = new Date();
};
Tag.create = function (newTag, result) {
dbConn.query("INSERT INTO tags set ?", newTag, function (err, res) {
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
Tag.findById = function (id_tag, result) {
dbConn.query("Select * from tags where id_tag = ? ", id_tag, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Tag.findAll = function (result) {
dbConn.query("Select * from tags", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('tags : ', res);
  result(null, res);
}
});
};
Tag.update = function(id_tag, tag, result){
dbConn.query("UPDATE tags SET nombre_tag=?, updated_at=now() WHERE id_tag = ?", [tag.nombre_tag, id_tag], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Tag.delete = function(id_song, result){
dbConn.query("DELETE FROM tags WHERE id_tag = ?", [id_song], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Tag;