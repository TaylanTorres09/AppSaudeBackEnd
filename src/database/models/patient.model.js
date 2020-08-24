const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    firstName: {  type: String, require: true },
    
    lastName: { type: String, required: true },

    email: { type: String, unique: true, require: true, lowercase: true },

    password: { type: String, required: true, select: false },

    createdAt: { type: Date, default: Date.now, },

    data: { type: mongoose.Schema.Types.ObjectId, ref: "PatientData" }
});

PatientSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const Patient = mongoose.model('Patient', PatientSchema, 'patient');
module.exports = Patient;
