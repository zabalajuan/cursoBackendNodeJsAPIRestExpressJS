const express = require('express'); //importamos express

//como no tenemos el router, le decimos a Express que lo genere
const router = express.Router();
//para trabajar con la libreria faker
const {faker} = require('@faker-js/faker');
const e = require('express');

//http://localhost:3000/products
//http://localhost:3000/products?size=2
// router.get('/products',(req,res)=> {
router.get('/',(req,res)=> {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.url(),
    })
  }
  res.json(products);
});


//endpoints especificos y dinamicos
//lo especifco (products/filter) debe ir antes del dinamico (products/:id)
//para que no haya problema sy cada uno funcione por separado
// router.get('/products/filter', (request, resolve)=>{
  //http://localhost:3000/products/12
router.get('/filter', (request, resolve)=>{
  resolve.send('Yo soy un filtro');
})
//el id del producto lo pasamos con ":id" para que quede como parametro
// router.get('/products/:id', (req,res)=>{
router.get('/:id', (req,res)=>{
  //const = req.params.id
  const {id} = req.params;
  //todos los parametros que se envian vienen como string
  if(id === '999'){
    res.status(404).json({
      message:'not found'
    })
  } else {
    res.status(200).json({
      id,
      name: "Product 2",
      price: 1000,

    });

  }
});

//------ POST -----------
router.post('/', (req,res)=>{
  //no lo traemos sin estructurar porque queremos que nos traiga todo
  const body = req.body;
  res.status(201).json({
    message:'created succesfully',
    data: body
  })
})


//------ PATCH -----------
// solo es necesario actualizar un atributo
//recibe como parametro el id del producto
router.patch('/:id', (req,res)=>{
  const {id} = req.params;
  //no lo traemos sin estructurar porque queremos que nos traiga todo
  const body = req.body;
  res.json({
    message:'partial update succesfully',
    data: body,
    id
  })
})


//------ DELETE -----------
// Para borrar una entidad
//recibe como parametro el id del producto
router.delete('/:id', (req,res)=>{
  const {id} = req.params;
  res.json({
    message:'deleted',
    id
  });
})


//generamos un modulo exportable
module.exports = router;
