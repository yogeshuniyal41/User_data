const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    education: { type: String, required: true },
    contact: { type: Number, required: true },
    college: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
