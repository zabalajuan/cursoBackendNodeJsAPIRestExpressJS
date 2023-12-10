
//importamos joi
const Joi = require('joi');

//haremos un schema especifico para cada campo
const id = Joi.string().uuid();
// const name = Joi.string().alphanum().min(3).max(15); //alphanum no permite espacios
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

//crearemos un schema par ala creacion
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

//crearemos un schema para la actualizacion
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

//schema para un get
//validar si el id tiene un formato correcto
const getProductSchema = Joi.object({
  id: id.required(),
})


//los exportamos
module.exports = {createProductSchema, updateProductSchema,getProductSchema }
