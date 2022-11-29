'use strict';
const User = require('../models/user.model');
exports.login = function (req, res, next) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
      User.logIn(req, res, next);
      }
};
exports.signUp = function(req, res, next) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
      }else{
      User.create(req, res, next);
      }
};