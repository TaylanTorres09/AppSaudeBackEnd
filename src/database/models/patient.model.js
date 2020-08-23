const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    firstName: {  type: String, require: true, },
    
    lastName: { type: String, required: true },

    email: { type: String, unique: true, require: true, lowercase: true },

    password: { type: String, required: true, select: false, },

    createdAt: { type: Date, default: Date.now, },

    patientData: [{ type: mongoose.Schema.Types.ObjectId, ref: "PatientData" }]
});

PatientSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const Patient = mongoose.model('Patient', PatientSchema);


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
    gender: {  type: String, require: true, },
    
    birth: { type: Date, required: true },
    // Add more kind of data  <-------------- Taylan // DArlan



    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});

const PatientData = mongoose.model('PatientData', PatientDataSchema);

//--------------------------Export ------------------------


module.exports = Patient;
module.exports = PatientData;