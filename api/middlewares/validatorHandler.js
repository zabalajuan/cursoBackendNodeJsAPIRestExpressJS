
const boom = require('@hapi/boom');

//este middleware no necesita el error
//necesitamos configurar un middlewear dinamico
function validatorHandler(schema, property){
  //vamos a retornar una función que tenga el formato que requiere un middleware
  //estamos retornando un middleware de forma dinamica
  //estamos usando la habilidad de closures de javascript
  return (req, res, next) => {
    //la información que queremos validar
    //la información del request puede venir como
      //req.body
      //req.params
      //req.query
      //como la declaración de abajo, lo hacemos dinamico para que sea cualquiera de estos casos
    const data = req[property];
    //vamos a recibir el request, el schema de Joi tiene la propiedad validate
    //y le pasamos la información que vamos a validar
    //el abortFalse es para que detecte mas de un error en la estructura de datos
    const {error} = schema.validate(data,{abortEarly: false});
    //si la validacion anterior nos da un error, deberiamos lanzar un error tipo boom
    if(error) {
      //lo hacemos con next porque estamos usando el middleware
      next(boom.badRequest(error));
    }
    //si todo esta bien, continua
    next();
  }
}

module.exports = validatorHandler; //lo exportamos de forma directa
