const mongoose = require('mongoose');


const dailyAssessmentSchema = new mongoose.Schema({

    createdAt: { type: Date, default: Date.now, },

    patientId:{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" },

    pain: {  type: Boolean, require: true, }, //Question 01

    painLocation: {  type: Number, require: true, }, //Question 02

    worstPain: {  type: Number, require: true, }, //Question 03
    
    painAverage: {  type: Number, require: true, }, //Question 04

    moodInfluence: {  type: Number, require: true, }, //Question 05

    moodInfluence: {  type: Number, require: true, }, //Question 06

    influenceRelationship: {  type: Number, require: true, }, //Question 07

    sleep: {  type: Number, require: true, }, //Question 08

    selfEsteem: {  type: Number, require: true, }, //Question 09

    anguish: {  type: Number, require: true, }, //Question 11

    anxious: {  type: Number, require: true, }, //Question 12
});



const DailyAssessement = mongoose.model('DailyAssessement', dailyAssessmentSchema);


// ----------------------- patient data---------------------------



module.exports = DailyAssessement;