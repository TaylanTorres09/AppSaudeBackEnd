const createError = require('http-errors');
const mongoose = require('mongoose');

const ProfessionalData = require('../database/models/profissionalData.model');

module.exports = {
    getDataByUserId: async (req, res) => {
        try {
            const results = await ProfessionalData.findById(req.params.id);

            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    createData: async (req, res) => {
        try {
            const newProfessionalData = new ProfessionalData(req.body);
            const data = await newProfessionalData.save();

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },
    updateData: async (req, res) => {
        try {
            const data = await ProfessionalData.findOneAndUpdate(req.params.id, req.body);

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }
}