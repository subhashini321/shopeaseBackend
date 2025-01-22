import mongoose from 'mongoose';
const { Schema, model, Type } = mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String},
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
    size:{type:String},
    color:{type:[String],default:['#000000', '#FF0000', '#008000', '#FFFFFF']},
    addedCart:{type:Boolean,default:false}
});

const Product = model("products", ProductSchema)
export default Product;
