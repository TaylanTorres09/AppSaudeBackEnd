const createError = require('http-errors');
const mongoose = require('mongoose');

const Goals = require('../database/models/goals.model');
const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Professional = require('../database/models/professional.model');

module.exports = {
    getAllGoalsByUserId: async (req, res) => {
        try {
            const results = await Goals.find({patient_id: req.body.id});
            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateGoal: async (req, res) => {
        try {
            const { patient_Id } = req.body;
            const filter = { patient_id: patient_Id };
            const data = await Goals.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertProfissional: async (req, res) => {
        try {
            const { patient_id, profissional_id } = req.body;
            const filter = { patient_id: patient_id };
            const update = { "$push": { profissionals: profissional_id } };
            console.debug(patient_id)
            console.debug(profissional_id)
            const data = await PatientData.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }

    
}