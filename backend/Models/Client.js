import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    phone:{type: Number, required: true},
    address:{type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    note:{type: String, default: ''}
});

export default mongoose.model('Client', userSchema);