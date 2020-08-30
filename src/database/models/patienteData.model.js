const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
   
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    gender: {  type: String },
    
    birth: { type: Date},
    // Add more kind of data  <-------------- Taylan // DArlan


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});

const PatientData = mongoose.model('PatientData', PatientDataSchema);

module.exports = PatientData;