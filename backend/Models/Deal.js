import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    property: {type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true},
    agent: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    dealDate: {type: Date, required: true},
    dealPrice: {type: Number, required: true},
    commissionRate: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'closed', 'canceled'], default: 'pending'},
    dealType: {type: String, enum: ['sale', 'rent'], required: true},
    commissionAmount: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model('Deal', dealSchema);