const mongoose = require('mongoose');


// ----------------------- patient data---------------------------


const PatientDataSchema = new mongoose.Schema({

    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    firstName: {  type: String, require: true },
    
    lastName: { type: String, required: true },
    
    gender: { type: String,  default: ''},

    birth: { type: Date },
    // Add more kind of data  <-------------- Taylan // DArlan

    occupation: { type: String, default: '' },

    state: { type: String, default: '' },

    city: { type: String, default: '' },

    weight: { type: Number, default: null },

    height: { type: Number, default: null },

    imc: {type: Number, default: null},

    // Enumerar para ficar mais fácil.
    bloodtype: { type: String, enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "Não Sabe"], default: "Não Sabe" },

    condition: { type: String, default: '' },

    yeardiagnosis: {
        diagnosis: { type: Boolean, enum: ["SIM", "NÃO"] },
        year: { type: Date }
    },

    otherdisease: { type: String },

    field: { type: String },

    posologia: {
        dose: { type: String },
        frequency: { type: String }
    },


    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional", unique: true }],

    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }],

    daily: [{ type: mongoose.Schema.Types.ObjectId, ref: "DailyAssessement" }],
});

const PatientData = mongoose.model('PatientData', PatientDataSchema, 'PatientData');

module.exports = PatientData;