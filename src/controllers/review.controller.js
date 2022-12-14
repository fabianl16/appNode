'use strict';
const Review = require('../models/review.model');
exports.findAll = function(req, res) {
    Review.findAll(function(err, review) {
      console.log('controller')
      if (err)
      res.send(err);
      console.log('res', review);
      res.send(review);
    });
};
exports.create = function(req, res) {
const new_review = new Review(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Review.create(new_review, function(err, review) {
    if (err){
        res.status(400).send({ error:true, message: err });
    }else{
        res.json({error:false,message:"Review added successfully!",data:review});
    }

});
}
};
exports.findByUserId = function(req, res) {
Review.findByUserId(req.params.id, function(err, review) {
    if (err)
    res.send(err);
    res.json(review);
});
};
exports.findBySongId = function(req, res) {
    Review.findBySongId(req.params.id, function(err, review) {
        if (err)
        res.send(err);
        res.json(review);
    });
};
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
    Review.update(req.params.id,req.params.id_usuario, new Review(req.body), function(err, review) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Review successfully updated' });
});
}
};
exports.delete = function(req, res) {
Review.delete( req.params.id, function(err, Review) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Review successfully deleted' });
});
};