import mongoose from "mongoose";
const {Schema , model}=mongoose;
// agar tumhe search vali functionalit yalni hein to category or tags dalne padenge

const CartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
            quantity: { type: Number,  default: 1 },
            price: { type: Number,default:3},
            productId:{type:String},
            userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
            // discount: { type: Number, required: true },   
        },
    ],
});

const Cart=model("carts",CartSchema)
export default Cart