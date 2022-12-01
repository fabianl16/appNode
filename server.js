require('dotenv').config();
const express = require('express')
const cors    = require('cors');
const app = express();
const port = process.env.PORT;
const routerApi = require('./src/routes/index.router');
const bodyParser = require('body-parser');
//Dependencias de aplicación
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Servidor Funcionando!')
})
routerApi(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
