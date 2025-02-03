import mongoose from "mongoose";

//define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
      }
},{timestamps:true})

//define modal
const userModal = mongoose.model("user", userSchema)

export default userModal;