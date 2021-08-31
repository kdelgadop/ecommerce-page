import { Schema } from "mongoose";
const mongoose = require('mongoose')

const orderSchema = new Schema ({ 
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    order: {
        required: true,
        type: Array
    },
    orderStatus: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    total: {
        required: true,
        type: Number
    }
})

const Order = mongoose.model('Order', orderSchema)
export default Order