//para trabajar con la libreria faker
const {faker} = require('@faker-js/faker');

//vamos a utilizar programación orientada a objetos
//creamos una clase
class ProductsService {

  //de momento lo haremos en memoria local
  constructor(){
    this.products =[];
    this.generate();
  }

  //generar productos fake
  generate (){
    //de momento estamos generando 100 productos
    const limit = 100;
    for(let index = 0; index < limit; index++){
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
      })
    }
  }

  //funcion para crear productos
  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      //vamos a concatenar los valores que envian al servicio
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  // async find(){
  find(){
    //
    // return this.products;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(this.products);
      },3500)
    })
  }

  async findOne(id){
    //
    return this.products.find(item => item.id === id);
  }

  async update(id, changes){
    //me da la posicion en la que esta el objeto
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('product not found')
    }
    //esta opcion cambiara todo el producto
    // this.products[index] = changes;
    const product = this.products[index];
    this.products[index] = {
      //de esta forma estan persistiendo todos los atributos del producto
      //y agregando solo los cambios
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id){
    //me da la posicion en la que esta el objeto
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error('product not found')
    }
    //le decimos en que indice empezar, y cuantos elementos eliminar
    this.products.splice(index,1);
    return { id};
  }
}

module.exports = ProductsService;
