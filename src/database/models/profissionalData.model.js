const mongoose = require('mongoose');



const ProfissionalDDataSchema = new mongoose.Schema({
    gender: {  type: String, require: true, },
    
    birth: { type: Date, required: true },
    // Add more kind of data  <-------------- Taylan // DArlan



    profissionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});


const ProfissionalData = mongoose.model('ProfissionalData', ProfissionalDDataSchema);
module.exports = ProfissionalData;