const express = require('express'); //importamos express

//como no tenemos el router, le decimos a Express que lo genere
const router = express.Router();

//http://localhost:3000/categories/8/products/12
router.get('/:categoryId/products/:productId', (req,res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: "Product 2",
    price: 1000,

  });
});

//generamos un modulo exportable
module.exports = router;
