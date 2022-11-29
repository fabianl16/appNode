'use strict';
const cloudinary = require("../../cloudinary");
exports.upload = async function async (req, res, next) {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
        success: true,
        file: upload.secure_url,
    });
};
