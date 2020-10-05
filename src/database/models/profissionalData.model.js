const mongoose = require('mongoose');



const ProfissionalDDataSchema = new mongoose.Schema({
    profissional_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profissional",  required: true },

    firstName: {  type: String, require: true, },
    
    lastName: { type: String, required: true },

    Doc: { type: Number, unique: true, require: true }, //Profissional document which confirms his credential to practice a profession
    
    specialization: {type: String},
    
    otherSpecialization: [{type: String}],
    
    city: {type: String, uppercase:true},
    
    gender: {  type: String },

    other: { type: String },
   
    Doc:{ type: String },
    
    // Experiência
    about: { type: String },
    experience : [{ type: String }],
   

    birth: { type: Date},
  

    patients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Patient" }],
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goals" }]
});


const ProfissionalData = mongoose.model('ProfissionalData', ProfissionalDDataSchema,'ProfissionalData');
module.exports = ProfissionalData;
