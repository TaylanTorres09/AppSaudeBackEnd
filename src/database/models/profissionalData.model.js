const mongoose = require('mongoose');



const ProfissionalDDataSchema = new mongoose.Schema({
    profissional_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profissional",  required: true },
    gender: {  type: String },
    codigo:{ type: String},
    
    birth: { type: Date},
    // Add more kind of data  <-------------- Taylan // DArlan



    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});


const ProfissionalData = mongoose.model('ProfissionalData', ProfissionalDDataSchema,'ProfissionalData');
module.exports = ProfissionalData;
