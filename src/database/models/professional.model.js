const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const ProfissionalSchema = new mongoose.Schema({
    firstName: {  type: String, require: true, },
    
    lastName: { type: String, required: true },

    email: { type: String, unique: true, require: true, lowercase: true },

    Doc: { type: Number, unique: true, require: true }, //Profissional document which confirms his credential to practice a profession

    password: { type: String, required: true, select: false, },

    createdAt: { type: Date, default: Date.now, },

    patientData: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProfissionalData" }]
});

ProfissionalSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const Profissional = mongoose.model('Profissional', ProfissionalSchema,'profissional');

module.exports = Profissional;
