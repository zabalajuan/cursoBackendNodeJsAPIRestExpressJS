console.log('My App');

const express = require('express'); //importamos express
//importamos el router, el index.js de la carpeta routes
const routerApiTraida = require('./routes');

//creamos la aplicación
const app = express(); //metodo constructor
//en donde queremos que corra la aplicación
const port = 3000;

//para poder usar le metodo POST, debemos agregar este middle work
//con este ajuste ya deberíamos recibir información que llega por POST
app.use(express.json())


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


//le decimos a la app que puerto debe escuchar
//callback con lo que queremos avisar
app.listen(port, () => {
  console.log(`Conectado en el puerto http://localhost:${port}`);
});
