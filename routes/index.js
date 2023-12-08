const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

//esta funcion si recibe la aplicacion como parametro
function routerApi(app){
  //nos creamos un roputer, que nos lo da express
  const router = express.Router();
  app.use('/api/v1', router);
  //le damos toda la ruta mas el endpoint inicial
  // app.use('/products', productsRouter);
  // app.use('/users', usersRouter);
  // app.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

}


module.exports = routerApi;
