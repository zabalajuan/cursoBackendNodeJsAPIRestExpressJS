const express = require('express'); //importamos express

//como no tenemos el router, le decimos a Express que lo genere
const router = express.Router();

//Query params
//http://localhost:3000/api/v1/users?limit=10&offset=200
//http://localhost:3000/users?limit=10&offset=200
//http://localhost:3000/users
router.get('/', (req,res) => {
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

module.exports = router;
