import fs from 'fs'

class ProductManager{
    #path
    #format
    
    constructor (path){
        this.#path = path;
        this.#format = 'utf-8'
    }

     
    generateId= (productos) =>{
        return (productos.length === 0) ? 1 : productos[productos.length-1].id + 1
    }
    
    addProduct = async (product) => {
        const productos = await this.getProducts()
        const producto = {id:this.generateId(productos),...product}
        productos.push(producto)
        return await fs.promises.writeFile(this.#path,JSON.stringify(productos,null,'\t'))
    }

    getProducts = async () =>{
        return JSON.parse(await fs.promises.readFile(this.#path,this.#format))
        
    }
    getProductById = async (id) => {
        const productos = await this.getProducts()
        let encontrado = productos.find((producto)=> producto.code===id)
        if (encontrado===undefined){
            console.log('el producto no existe')
        }else{
            console.log(encontrado)
        }
    }

}
const fileName = './productos.json'
const manager = new ProductManager(fileName)

const newProduct = {
    title:'Jack Daniels',
    price: 12500,
    thumnail: 'image.png',
    code:12300,
    stock:500

}
manager.addProduct(newProduct)
manager.getProductById(12300)