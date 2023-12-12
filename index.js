console.log('My App');

const express = require('express'); //importamos express
//importamos el router, el index.js de la carpeta routes
const routerApiTraida = require('./routes');

const cors = require('cors');

//vamos a importar los middlewares
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

//creamos la aplicación
const app = express(); //metodo constructor
//en donde queremos que corra la aplicación
//si el puerto viene de una variable de entorno, se le asigna ese puerto
const port = process.env.PORT || 3000;

//para poder usar le metodo POST, debemos agregar este middle work
//con este ajuste ya deberíamos recibir información que llega por POST
app.use(express.json())


//llamamos el middleware cors
//crearemos un array con los origenes validos
const whitelist = ['http://localhost:3000','http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {

    // if (whitelist.includes(origin)){ //esta opcion no permite acceso desde el same-origin
    if (!origin || whitelist.includes(origin)){
      //null indica que no hay ningun error
      //true, el acceso esta permitido
      callback(null, true);
    } else {
        callback(new Error('no permitido'));
    }
  }
}
// app.use(cors()); //aquí estaríamos habilitando cualquier dominio
app.use(cors(options));


//vamos a definir una ruta
//tiene el callback que va a ejecutar la respuesta que enviamos al cliente
//Parametros "req" request and "res" resolve
app.get('/',(req,res)=> {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta',(req,res)=> {
  res.send('Hola, soy una nueva ruta');
});
//estamos modularizando la aplicación, cada ruta tiene un modelo
routerApiTraida(app);




//los midllewares deben estar despues del router, el orden es relevante
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//le decimos a la app que puerto debe escuchar
//callback con lo que queremos avisar
app.listen(port, () => {
  console.log(`Conectado en el puerto http://localhost:${port}`);
});
