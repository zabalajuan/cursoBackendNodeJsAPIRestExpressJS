const express = require('express'); //importamos express

//como no tenemos el router, le decimos a Express que lo genere
const router = express.Router();
//Primero lo importamos
const ProductsService = require('./../services/productService')
//en el routing de servicios tenemos que crear una instancia del servicio d eproductos
const service = new ProductsService();

//http://localhost:3000/products
//http://localhost:3000/products?size=2
// router.get('/products',(req,res)=> {
router.get('/',async (req,res)=> {
  // const products = [];
  // const {size} = req.query;
  // const limit = size || 10;
  //   for(let index = 0; index < limit; index++){
  //     products.push({
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(),10),
  //       image: faker.image.url(),
  //     })
  //   }
  //--------------------------
  //ya simplemente podemos llamar nuestro servicio
  const products = await service.find();
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
router.get('/:id', async (req,res)=>{
  //const = req.params.id
  const {id} = req.params;
  // //todos los parametros que se envian vienen como string
  // if(id === '999'){
  //   res.status(404).json({
  //     message:'not found'
  //   })
  // } else {
  //   res.status(200).json({
  //     id,
  //     name: "Product 2",
  //     price: 1000,
  //   });
  // }

  const product = await service.findOne(id);
  res.json(product);
});

//------ POST -----------
router.post('/',async (req,res)=>{
  //no lo traemos sin estructurar porque queremos que nos traiga todo
  const body = req.body;
  const newProduct = await service.create(body);
  // res.status(201).json({
  //   message:'created succesfully',
  //   data: body
  // })
  res.status(201).json(newProduct);
})


//------ PATCH -----------
// solo es necesario actualizar un atributo
//recibe como parametro el id del producto
router.patch('/:id',async (req,res)=>{
  // const {id} = req.params;
  // //no lo traemos sin estructurar porque queremos que nos traiga todo
  // const body = req.body;
  // //usando el servicio
  // const product = await service.update(id, body);
  // // res.json({
  // //   message:'partial update succesfully',
  // //   data: body,
  // //   id
  // // })
  // res.json(product);
  try{
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  }catch(error){
    res.status(404).json({
      //se envia el error que habiamos definido en el servicio
      message:error.message
    })
  }
})


//------ DELETE -----------
// Para borrar una entidad
//recibe como parametro el id del producto
router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  //usando el servicio
  const respuesta = await service.delete(id);
  // res.json({
  //   message:'deleted',
  //   id
  // });
  res.json(respuesta);
})


//generamos un modulo exportable
module.exports = router;
