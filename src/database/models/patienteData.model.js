const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
   
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    gender: {  type: String },
    
    birth: { type: Date},
    // Add more kind of data  <-------------- Taylan // DArlan


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }],

    daily: [{ type: mongoose.Schema.Types.ObjectId, ref: "Daily" }],
});

const PatientData = mongoose.model('PatientData', PatientDataSchema,'PatientData');

module.exports = PatientData;