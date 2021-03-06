const mongoose = require('mongoose');
const moment = require('moment-timezone')


const dailyAssessmentSchema = new mongoose.Schema({

    createdAt: { type: Date, default: moment.tz("America/Sao_Paulo").utc(true), },

    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient"},

    patientdata_id:{ type: mongoose.Schema.Types.ObjectId, ref: "PatientData" },

    pain: {  type: Boolean, }, //Question 01

    painLocation: {  type: Array,  }, //Question 02

    worstPain: {  type: Number,  }, //Question 03
    
    painAverage: {  type: Number,  }, //Question 04

    moodInfluence: {  type: Number,  }, //Question 05
    
    habitualActivities: {  type: Number,  }, //Question 05

    influenceRelationship: {  type: Boolean,  }, //Question 07

    sleep: {  type: Number,  }, //Question 08
    
    sexBehavior: {  type: Number,  }, //Question 09

    selfEsteem: {  type: Number,  }, //Question 09

    anguish: {  type: Number,  }, //Question 11

    anxious: {  type: Number,  }, //Question 12

});



const DailyAssessement = mongoose.model('DailyAssessement', dailyAssessmentSchema, 'DailyAssessement');


// ----------------------- patient data---------------------------



module.exports = DailyAssessement;