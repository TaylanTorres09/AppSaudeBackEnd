const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        collection: 'user',
    }
);

PatientSchema.pre('save', async function (next) {

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})


const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient;