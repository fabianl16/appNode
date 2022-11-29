'use strict';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var   dbConn = require('./../../config/db.config');
var User = function(user){
    this.nombre_usuario   = user.nombre_usuario;
    this.foto_perfil      = user.foto_perfil;
    this.contrasena       = bcrypt.hash(user.contrasena,10);
    this.email            = user.email;
    this.created_at       = new Date();
    this.updated_at       = new Date();
};
User.create = function (req, res, next) {
  dbConn.query(
    `SELECT * FROM usuarios WHERE LOWER(nombre_usuario) = LOWER(${dbConn.escape(
      req.body.nombre_usuario
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This username is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.contrasena, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            dbConn.query(
              `INSERT INTO usuarios (nombre_usuario, email, foto_perfil, contrasena, last_login, registered) VALUES ( ${dbConn.escape(
                req.body.nombre_usuario
              )},${dbConn.escape(
                req.body.email
              )},${dbConn.escape(
                req.body.foto_perfil
              )}, ${dbConn.escape(hash)},now(), now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
};
User.logIn = function(req, res, next) {
  dbConn.query(
    `SELECT * FROM usuarios WHERE nombre_usuario = ${dbConn.escape(req.body.nombre_usuario)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.contrasena,
        result[0]['contrasena'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].nombre_usuario,
                userId: result[0].id_usuario
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
            dbConn.query(
              `UPDATE usuarios SET last_login = now() WHERE id_usuario = '${result[0].id_usuario}'`
            );
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
};
module.exports= User;
