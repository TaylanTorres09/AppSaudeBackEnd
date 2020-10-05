const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const ProfissionalSchema = new mongoose.Schema({


    email: { type: String, unique: true, require: true, lowercase: true },

    password: { type: String, required: true, select: false, },

    createdAt: { type: Date, default: Date.now, },

    profissionalData: {type:mongoose.Schema.Types.ObjectId, ref:'ProfissionalData'}

});

ProfissionalSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

const Profissional = mongoose.model('Profissional', ProfissionalSchema,'Profissional');

module.exports = Profissional;
