import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {   
        id: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);