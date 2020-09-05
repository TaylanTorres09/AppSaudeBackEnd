const mongoose = require('mongoose');



const ProfissionalDDataSchema = new mongoose.Schema({
    Profissional_Id: { type: mongoose.Schema.Types.ObjectId, ref: "profissional",  required: true },
    gender: {  type: String },
    
    birth: { type: Date},
    // Add more kind of data  <-------------- Taylan // DArlan



    patient: [{ type: mongoose.Schema.Types.ObjectId, ref: "patient" }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "goals" }]
});


const ProfissionalData = mongoose.model('ProfissionalData', ProfissionalDDataSchema,'profissionalData');
module.exports = ProfissionalData;
