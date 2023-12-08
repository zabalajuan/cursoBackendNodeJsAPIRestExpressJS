console.log('My App');


const express = require('express'); //importamos express
//creamos la aplicación
const app = express(); //metodo constructor
//en donde queremos que corra la aplicación
const port = 3000;

//para trabajar con la libreria faker
const {faker} = require('@faker-js/faker');

//vamos a definir una ruta
//tiene el callback que va a ejecutar la respuesta que enviamos al cliente
//Parametros "req" request and "res" resolve
app.get('/',(req,res)=> {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta',(req,res)=> {
  res.send('Hola, soy una nueva ruta');
});

//http://localhost:3000/products
//http://localhost:3000/products?size=2
app.get('/products',(req,res)=> {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products);
});


//endpoints especificos y dinamicos
//lo especifco (products/filter) debe ir antes del dinamico (products/:id)
//para que no haya problema sy cada uno funcione por separado
app.get('/products/filter', (request, resolve)=>{
  resolve.send('Yo soy un filtro');
})
//el id del producto lo pasamos con ":id" para que quede como parametro
app.get('/products/:id', (req,res)=>{
  //const = req.params.id
  const {id} = req.params;
  res.json({
    id,
    name: "Product 2",
    price: 1000,

  });
});


//http://localhost:3000/
app.get('/categories/:categoryId/products/:productId', (req,res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: "Product 2",
    price: 1000,

  });
});

//Query params
//http://localhost:3000/users?limit=10&offset=200
app.get('/users', (req,res) => {
  //los query params los recibimos de esta forma
  const {limit, offset} = req.query;
  //al ser opcionales, debemos hacer una validación
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay query params')
  }

})



//le decimos a la app que puerto debe escuchar
//callback con lo que queremos avisar
app.listen(port, () => {
  console.log(`Conectado en el puerto http://localhost:${port}`);
});
