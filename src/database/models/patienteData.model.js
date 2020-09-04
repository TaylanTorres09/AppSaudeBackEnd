const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({
   
<<<<<<< HEAD
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
=======
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "patient" },
>>>>>>> master

    gender: {  type: String },
    
    birth: { type: Date},
    // Add more kind of data  <-------------- Taylan // DArlan


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "profissional" }],
    
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goals" }]
});

const PatientData = mongoose.model('PatientData', PatientDataSchema,'patientData');

module.exports = PatientData;