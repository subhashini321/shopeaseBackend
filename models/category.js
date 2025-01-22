import mongoose from "mongoose";

const {Schema ,model}=mongoose
const category=new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes extra spaces
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
},{timestamps:true})

const Category=model("category",category)
export default Category