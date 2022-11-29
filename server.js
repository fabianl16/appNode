const express = require('express')
const cors    = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const routerApi = require('./src/routes/index.router');
const bodyParser = require('body-parser');
//Dependencias de aplicación
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});
routerApi(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
