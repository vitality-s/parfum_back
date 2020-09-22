import {Schema} from "mongoose"
import mongoose from "mongoose"

const OrderSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true
        },
        attachment: {
            type: String,
        },
        price: {
            type: Number
        }
    }
)
const OrderModel = mongoose.model("order", OrderSchema);
export default OrderModel