const Joi = require('joi');
module.exports = {
  validateReviewToCreate: (req, res, next) => {
    const data = req.body;
    const {error} = schema.validate(data);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
         });
    }
    next();
  }
};

const schema = Joi.object({
    id_usuario: Joi.number()
            .integer()
            .required(),
    song_id: Joi.number()
            .integer()
            .required(),
    texto: Joi.string()
            .min(3)
            .max(250)
            .required(),
    title: Joi.string()
            .min(3)
            .max(50)
            .required(),
    hidden: Joi.number()
            .integer()
            .min(0)
            .max(1) 
            .required(),
    imagen: Joi.string()
            .optional(),
    tag_id: Joi.number()
            .integer()
            .optional()
});