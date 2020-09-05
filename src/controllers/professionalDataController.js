const createError = require('http-errors');
const mongoose = require('mongoose');

const ProfessionalData = require('../database/models/profissionalData.model');

module.exports = {
    getDataByUserId: async (req, res) => {
        try {
            const results = await ProfessionalData.findById(req.params.id);

            return res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    createData: async (req, res) => {
        try {
            const newProfessionalData = new ProfessionalData(req.body);
            const data = await newProfessionalData.save();

            res.send({ data })
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },
    updateData: async (req, res) => {
        try {
            const { profissional_Id } = req.body;
            const filter = { Profissional_Id: profissional_Id };
            const data = await ProfessionalData.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
            res.send({ data })
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertPatient: async (req, res) => {
        try {
            const { profissional_Id, patient } = req.body;
            const filter = { Profissional_Id: profissional_Id };
            const update = { "$push": { patient: patient } };
            const data = await ProfessionalData.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }

}