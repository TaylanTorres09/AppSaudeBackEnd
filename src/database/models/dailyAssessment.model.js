const mongoose = require('mongoose');


const dailyAssessmentSchema = new mongoose.Schema({

    createdAt: { type: Date, default: Date.now, },

    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient"},

    patientdata_id:{ type: mongoose.Schema.Types.ObjectId, ref: "PatientData" },

    pain: {  type: Boolean, }, //Question 01

    painLocation: {  type: Number,  }, //Question 02

    worstPain: {  type: Number,  }, //Question 03
    
    painAverage: {  type: Number,  }, //Question 04

    moodInfluence: {  type: Number,  }, //Question 05

    influenceRelationship: {  type: Number,  }, //Question 07

    sleep: {  type: Number,  }, //Question 08

    selfEsteem: {  type: Number,  }, //Question 09

    anguish: {  type: Number,  }, //Question 11

    anxious: {  type: Number,  }, //Question 12

});



const DailyAssessement = mongoose.model('DailyAssessement', dailyAssessmentSchema, 'DailyAssessement');


// ----------------------- patient data---------------------------



module.exports = DailyAssessement;