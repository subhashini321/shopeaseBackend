import express from "express"
import { addToCart, getCartItem, removeFromCart } from "../controllers/cartController.js"
const carRouter=express.Router()
import { verifyToken } from "../middleware/authMiddleware.js";

carRouter.post("/add-cart" ,verifyToken(),addToCart)
carRouter.get("/get-cart",verifyToken(),getCartItem)
carRouter.delete("/remove/:productId",verifyToken(),removeFromCart)

export default carRouter