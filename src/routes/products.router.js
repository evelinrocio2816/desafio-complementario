const express =require("express")
const router =  express.Router()
const fs = require('fs').promises;

const ProductManager = require("../Dao/database/Product-manager.db.js")
const productManager =new ProductManager()

//Router

//Agregar Productos
router.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    
     const existingProduct = await productManager.getProductsById(newProduct.code);
     if (existingProduct) {
   
       return res.status(400).json({ status: "error", message: "El ID del producto ya existe" });
     }
     await productManager.addProduct(newProduct);
    res.json({ status: "success", message: "Producto Creado" });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});

  
  // Ruta para actualizar un producto por su ID
  router.put("/products/:pid", async (req, res) => {
    try {
      const productIdToUpdate = req.params.pid;
      const updatedProductData = req.body;
      await productManager.upDateProducts(productIdToUpdate, updatedProductData);
      res.json({ status: "success", message: "Producto Actualizado" });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  });
  


 //Ruta DELETE para eliminar un producto por ID
router.delete("/products/:pid", async (req, res) => {
  try {
    const productIdToDelete = req.params.pid;
    const existingProduct = await productManager.getProductsById(productIdToDelete);

    if (!existingProduct) {

      return res.status(404).json({ status: "error", message: "El Producto no existe" });
    }


    await productManager.deleteProduct(productIdToDelete);
    res.json({ status: "success", message: "Producto Eliminado" });

  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ status: "error", message: "Error interno del servidor" });
  }
});




  //Limit listar productos
  
  router.get("/products", async(req, res)=>{
    try {
       const limit = req.query.limit;
       const products = await productManager.getProducts()
       if(limit){
        res.json(products.slice(0, limit))
       }
       res.json(products)
    } catch (error) {
      console.error("Error al obtener productos", error);
      res.status(500).json({error: "error interno del servidor"})
    }
  })
  
  
  
  
  //busqueda por id

  router.get("/products/:pid",async(req, res)=>{
    const id= req.params.id
    try {
      const product = await productManager.getProductsById(id)
      if(!product){
        return res.json({
          error: "producto no encontrado"
        })
      }
      res.json(product)

    } catch (error) {
      console.error("error al obtener Productos", error);
      res.status(500).json({error:"error interno del servidor"})
    }
  })
  
 
  module.exports= router;