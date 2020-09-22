import {Schema} from "mongoose"
import mongoose from "mongoose"

const UserSchema = new Schema({
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        basket: [{
            type: Schema.Types.ObjectId,
            ref: "product",
            default: null
        }],
        own: {
            type: Boolean,
            default: false
        }
    }
)
const UserModel = mongoose.model("user", UserSchema);
export default UserModel