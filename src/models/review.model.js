'use strict';
var dbConn = require('./../../config/db.config');
//Review object create
var Review = function(review){  
  this.id_usuario   = review.id_usuario;
  this.song_id      = review.song_id;
  this.title        = review.title;
  this.texto        = review.texto;
  this.hidden       = review.hidden;
  this.imagen       = review.imagen;
  this.tag_id       = review.tag_id;
  this.created_at       = new Date();
  this.updated_at       = new Date();
};
Review.create = function (newReview, result) {
  dbConn.query("INSERT INTO reviews set ?", newReview, function (err, res) {
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
Review.findByUserId = function (id_usuario, result) {
var query = 'SELECT * FROM reviews INNER JOIN songs ON songs.id_song = reviews.song_id INNER JOIN tags ON tags.id_tag = reviews.tag_id WHERE reviews.id_usuario = ?';
dbConn.query(query, id_usuario, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Review.findBySongId = function (id_song, result) {
  var query = 'SELECT * FROM reviews INNER JOIN usuarios ON usuarios.id_usuario= reviews.id_usuario INNER JOIN songs ON songs.id_song = reviews.song_id INNER JOIN tags ON tags.id_tag = reviews.tag_id WHERE reviews.song_id = ?';
  dbConn.query(query, id_song, function (err, res) {
  if(err) {
    console.log("error: ", err);
    result(err, null);
  }
  else{
    result(null, res);
  }
  });
};
Review.findAll = function (result) {
dbConn.query("Select * from reviews", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('reviews : ', res);
  result(null, res);
}
});
};
Review.update = function(id_review, id_usuario, review, result){
dbConn.query("UPDATE reviews SET texto=?, hidden=?, updated_at = now() WHERE id_review = ? AND id_usuario = ?", [review.texto, review.hidden, id_review, id_usuario], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Review.delete = function(id_review, result){
dbConn.query("DELETE FROM reviews WHERE id_review = ?", [id_review], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};

module.exports= Review;