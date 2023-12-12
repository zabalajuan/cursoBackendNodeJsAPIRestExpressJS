
//vamos a generar un middleware que se encargará de manejar errores globales
function logErrors (err, req, res, next){
  console.log('logErrors');
  console.error(err);
  //siga con la ejecución normal
  next(err); //es un middleware de tipo error, al enviar el error

}

//detectaremos un error y le daremos formato para envio al cliente
function errorHandler(err, req, res, next){
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack

    }
  )

}

//este middleware es para le manejo de errores con Boom
function boomErrorHandler(err, req, res, next){

  console.log('boomErrorHandler');
  //Boom le agrega una propiedad a los errores que permite identificar si es tipo boom
  if(err.isBoom){
    //boom maneja toda la info del error en el parametro output
    const {output} = err;
    //si el error es de tipo boom, queremos que el middleware lo notifique y temrine el proceso
    //el status es dinamico, statusCode tiene el numero del error dado por boom
    //la información del error biene en el payload (json)
    res.status(output.statusCode).json(output.payload);
  }else {
    next(err);

  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
