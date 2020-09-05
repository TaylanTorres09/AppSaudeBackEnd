const createError = require('http-errors');
const mongoose = require('mongoose');

const ProfessionalData = require('../database/models/profissionalData.model');
const Professional = require('../database/models/professional.model');
const Patient = require('../database/models/patient.model')

module.exports = {
    getDataByUserId: async (req, res) => {
        try {
            console.debug(req.body)
            const results = await ProfessionalData.
                                    findOne({profissional_id: req.body.profissional_id}).
                                    populate('patients').
                                    populate('patients.patientData');

            return res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    updateData: async (req, res) => {
        try {
            const { profissional_Id } = req.body;
            const filter = { profissional_id: profissional_Id };
            const data = await ProfessionalData.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
            res.send({ data })
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertPatient: async (req, res) => {
        try {
            const { profissional_id, patient_id } = req.body;
            const filter = { profissional_id: profissional_id };
            const update = { "$push": { patients: patient_id } };
            const data = await ProfessionalData.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }

}