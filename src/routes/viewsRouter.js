import { Router } from "express";

import ProductManager from "../ProductManager.js";

const viewsRouter = Router();
const manager = new ProductManager("./productos.json");

viewsRouter.get("/", async (req, res) => {
  let products = await manager.getProducts();

  res.render("home", { products });
});

viewsRouter.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default viewsRouter;
