import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = Router();
const manager = new ProductManager("./productos.json");

productsRouter.get("/", async (req, res) => {
  let products = await manager.getProducts();
  let { limit } = req.query;
  let prodQuery = {};

  for (let i = 0; i < (limit || products.length); i++) {
    prodQuery[`Producto ${i + 1}`] = products[i];
  }

  res.send(prodQuery);
});

productsRouter.get("/:pid", async (req, res) => {
  let product = await manager.getProductById(req.params.pid);

  res.send(product || "El producto no existe");
});

productsRouter.post("/", async (req, res) => {
  let newProd = req.body;
  newProd.status = true;

  let message = await manager.addProduct(newProd);
  res.send(message);
});

productsRouter.put("/:pid", async (req, res) => {
  let message = await manager.updateProduct(req.params.pid, req.body);
  res.send(message);
});

productsRouter.delete("/:pid", async (req, res) => {
  let message = await manager.deleteProduct(req.params.pid);
  res.send(message);
});

export default productsRouter;
