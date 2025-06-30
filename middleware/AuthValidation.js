const Joi = require('joi');
const schema  = require('../model/user');

const signupValidation = (req, res, next) =>{
    const NewSchema = Joi.object({
        name: Joi.string().alphanum().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });
     const  {error} = NewSchema.validate(req.body);
     console.log(req.body);
    if (error){
        return res.status(400)
        .json({message: "Bad request", error})
    } else {
        next();
    }
}

const loginValidation = (req, res, next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error){
        return res.status(400)
        .json({message: "Bad request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
