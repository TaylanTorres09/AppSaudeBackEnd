const moment = require('moment');
const mongoose = require('mongoose');

//moment.tz(new Date, 'America/Sao_Paulo')

//date.toLocaleString('pt-br', {timezone: 'Brazil/brt'})
const CheckSchema = new mongoose.Schema({
    createdAt: {type:Date, default: moment.unix(1601170982).utc(true)},

    meta_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Goals", required: true },

    active:{ type:Boolean, required: true},
});


const Check = mongoose.model('Check', CheckSchema,'Check');


const GoalsSchema = new mongoose.Schema({

    createdAt: { type: Date, default: Date.now, },

    patient_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

    profissional_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Profissional", required: true },

    content: { type: String, required: true },

    // completed: { type: Boolean, require: true, default: false}

    checks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Check" }]

});



const Goals = mongoose.model('Goals', GoalsSchema,'Goals');


// ----------------------- patient data---------------------------



module.exports = {Goals, Check};