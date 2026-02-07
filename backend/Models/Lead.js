import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    phone:{type: Number, required: true},
    leadSource:{type: String, required: true},
    status:{type: String, enum: ['new', 'contacted', 'qualified', 'lost', 'converted'], default: 'new'},
    createdAt: {type: Date, default: Date.now},
    note:{type: String, default: ''},
    typeofProperty:{type: String, required: true},
    budget:{type: Number, required: true},
    location:{type: String, required: true},
    createdByAgent:{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}
});

export default mongoose.model('Lead', userSchema);