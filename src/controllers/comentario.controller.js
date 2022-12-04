'use strict';
const Comment = require('../models/comentario.model');
exports.findAll = function(req, res) {
Comment.findAll(function(err, comentario) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', comentario);
  res.send(comentario);
});
};

exports.create = function(req, res) {
const new_comment = new Comment(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
    Comment.create(new_comment, function(err, comment) {
      if (err)
      res.send(err);
      res.json({error:false,message:"Comment added successfully!",data:comment});
    });
    }
};

exports.findById = function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
      if (err)
      res.send(err);
      res.json(comment);
    });
};
exports.findByReviewId = function(req, res) {
  Comment.findByReviewId(req.params.id, function(err, comment) {
    if (err)
    res.send(err);
    res.json(comment);
  });
};
exports.update = function(req, res) {
      if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
        Comment.update(req.params.id, req.params.id_usuario, new Comment(req.body), function(err, comment) {
       if (err)
       res.send(err);
       res.json({ error:false, message: 'Comment successfully updated' });
    });
    }
};

exports.delete = function(req, res) {
    Comment.delete( req.params.id, function(err, Comment) {
      if (err)
      res.send(err);
      res.json({ error:false, message: 'Comment successfully deleted' });
    });
};

