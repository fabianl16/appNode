const express = require('express')
const router = express.Router()
const uploadController  =   require('../controllers/upload.controller');
const multiparty        =   require('multiparty');
const uploader          = require('../middleware/multer.js');
router.post('/image',uploader.single("file"),uploadController.upload);
module.exports = router