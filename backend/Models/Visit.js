import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lead: {type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true},
    property: {type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true},
    agent: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    visitDate: {type: Date, required: true},
    status: {type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled'},
    feedback: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model('Visit', userSchema);