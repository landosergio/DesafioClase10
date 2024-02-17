import express from "express";

import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { __dirname } from "./utils.js";

import ProductManager from "./ProductManager.js";

const manager = new ProductManager("./productos.json");

//Express
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../public"));

const httpServer = app.listen(8080, () =>
  console.log("Escuchando en puerto 8080")
);

//Socket.io
const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado");

  let products = await manager.getProducts();
  socketServer.emit("realTimeProducts", products);
});

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Router
app.use(
  "/api/products",
  (req, res, next) => {
    req.socketServer = socketServer;
    return next();
  },
  productsRouter
);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
