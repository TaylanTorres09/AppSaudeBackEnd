const mongoose = require('mongoose');

const painEducationSchema = new mongoose.Schema({
    name: {type: String},

    description: {type: String},

    image: {
        size: {type: Number},
        hash: {type: String},
        url: {type: String} 
    },

    link: {type: String},

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const painEducation = mongoose.model('painEducation', painEducationSchema, 'painEducation');

module.exports = painEducation;