import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    location: {type: String, required: true},
    propertyType: {type: String, required: true},
    purpose: {type: String, enum: ['sale', 'rent'], required: true},
    status: {type: String, enum: ['available', 'sold', 'rented'], default: 'available'},
    Images: [{type: String}],
    createdbyagent: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},});
    
export default mongoose.model('Property', propertySchema);