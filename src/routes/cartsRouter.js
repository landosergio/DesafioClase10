import { Router } from "express";
import CartsManager from "../CartsManager.js";

const cartsRouter = Router();
const manager = new CartsManager("./carritos.json");

cartsRouter.post("/", async (req, res) => {
  let message = await manager.addCart(req.body);
  res.send(message);
});

cartsRouter.get("/:cid", async (req, res) => {
  let cart = await manager.getCartById(req.params.cid);
  res.send(cart?.products || "No existe el carrito");
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  let message = await manager.addProductToCart(req.params.cid, req.params.pid);
  res.send(message);
});

export default cartsRouter;
