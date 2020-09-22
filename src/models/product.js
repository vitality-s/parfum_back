import {Schema} from "mongoose";
import mongoose from "mongoose"

const ProductSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        model: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        emblem: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        descript: {
            type: String,
        },
        country: {
            type: String,
        },
        type: [{
            type: String,
            default: ""
        }],
        classific: {
            type: Object,
            default: 'elit'
        },
        start_note: [{
            type: Object,
        }],
        end_node: [{
            type: Object,
        }]
    }
)
const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel