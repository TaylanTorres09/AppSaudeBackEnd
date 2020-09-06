const createError = require('http-errors');
const mongoose = require('mongoose');

const Daily = require('../database/models/dailyAssessment.model');
const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Professional = require('../database/models/professional.model');

module.exports = {
    getAll: async (req, res) => {
        try {
            const results = await Daily.find({patient_id: req.body.id});
            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateDaily: async (req, res) => {
        try {
            const { patient_Id } = req.body;
            const {createdAt} = Date.now;
            const filter = { patient_id: patient_Id, createdAt: createdAt };
            const data = await Daily.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    create: async (req, res) => {
        try {
            const newDaily = new Daily(req.body);
            const daily = newDaily.save();
            const { patient_id } = req.body;
            const filter = { patient_id: patient_id };
            const update = { "$push": { daily: daily._id } };
            console.debug(patient_id)
            const data = await PatientData.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }

    
}