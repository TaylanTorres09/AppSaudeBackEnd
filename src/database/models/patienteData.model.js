const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
   
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },

    gender: {  type: String, require: true, },
    
    birth: { type: Date, required: true },
    // Add more kind of data  <-------------- Taylan // DArlan


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});

const PatientData = mongoose.model('PatientData', PatientDataSchema);

module.exports = PatientData;