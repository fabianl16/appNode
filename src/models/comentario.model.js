'use strict';
var dbConn = require('./../../config/db.config');
var Comment = function(comment){
    this.review_id        = comment.review_id;
    this.comentario       = comment.comentario;
    this.id_usuario       = comment.id_usuario;
    this.created_at       = new Date();
    this.updated_at       = new Date();
};

Comment.create = function (newComment, result) {
    dbConn.query("INSERT INTO comentarios set ?", newComment, function (err, res) {
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

Comment.findById = function (id_comentario, result) {
    dbConn.query("Select * from comentarios where id_comentario = ? ", id_comentario, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
    });
};

Comment.findAll = function (result) {
    dbConn.query("Select * from comentarios", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('comentarios : ', res);
      result(null, res);
    }
    });
};

Comment.update = function(id_comentario, id_usuario, comment, result){
    dbConn.query("UPDATE comentarios SET comentario=?, updated_at = now() WHERE id_comentario =? AND id_usuario =?", [comment.comentario, id_comentario, id_usuario], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
    });
};

Comment.delete = function(id_comentario, result){
    dbConn.query("DELETE FROM comentarios WHERE id_comentario = ?", [id_comentario], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
    });
};

module.exports= Comment;