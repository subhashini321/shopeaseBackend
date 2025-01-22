// const mongoose = require('mongoose');
import mongoose from "mongoose";
const {Schema,model}=mongoose

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending',
    },
    shippingAddress: {
        type: String,
        required: true,
    },
  
},{timestamps:true});

// module.exports = mongoose.model('Order', OrderSchema);
const Order = mongoose.model('Order', OrderSchema);
export default Order 
