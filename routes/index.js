import express from "express";
import authRouter from "./authRoutes.js";
import productRouter from "./productRoutes.js";
import carRouter from "./cartRoutes.js";
let router = express.Router();

router.use("/auth",authRouter)
router.use("/product",productRouter)
router.use("/cart",carRouter)

export default router