import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/productController.js"
const productRouter=express.Router()
import {upload} from '../config/imageUpload.js'

productRouter.post("/add",upload.single('file'),createProduct)
productRouter.get("get-product-byId/:id",getProduct)
productRouter.get("/get",getAllProduct)
productRouter.put("/update/:id",updateProduct)
productRouter.delete("/delete/:id",deleteProduct)
export default productRouter