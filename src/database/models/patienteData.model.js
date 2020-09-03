const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
   
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },

    gender: {  type: String, require: true, },
    
    birth: { type: Date, required: true },
    // Add more kind of data  <-------------- Taylan // DArlan


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goals" }]
});

const PatientData = mongoose.model('PatientData', PatientDataSchema,'patientData');

module.exports = PatientData;