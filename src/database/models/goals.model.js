const mongoose = require('mongoose');


const GoalsSchema = new mongoose.Schema({

    createdAt: { type: Date, default: Date.now, },

    patientId:{ type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    profissionalId:{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional", required: true },

    content: { type: String, required: true },

    completed: { type: Boolean, require: true, default: false}

});



const Goals = mongoose.model('Goals', GoalsSchema);


// ----------------------- patient data---------------------------



module.exports = Goals;