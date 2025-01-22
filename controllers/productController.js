import Product from "../models/Product.js";
import { STATUS } from "../common/constants.js";

export const createProduct = async (req, res) => {
    try {
        const file = req.file;

        // Ensure file exists
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        console.log(file);
        req.body.image=req.file.filename

        const product = new Product(req.body);

        // Save product to DB
        const savedProduct = await product.save();

        // Log saved product to check if the product is saved correctly
        console.log(savedProduct);

        // Return success message
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });
    } catch (error) {
        console.error("Error while saving product:", error);
        res.status(500).json({ message: error.message });
    }
};


export const getProduct=async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(STATUS.OK).json({ product });
        } catch (error) {
            res.status(STATUS.INTERNAL_ERROR).json({ message: error.message });
            }
}

export const updateProduct=async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(STATUS.OK).json({ product });
        } catch (error) {
            res.status(STATUS.INTERNAL_ERROR).json({ message: error.message });
            }
}

export const deleteProduct=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(STATUS.OK).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(STATUS.INTERNAL_ERROR).json({ message: error.message });
            }
}

export const getAllProduct=async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(STATUS.OK).json({ products });
    }catch(err){
        res.status(STATUS.INTERNAL_ERROR).json({ message: err.message });
    }
}

