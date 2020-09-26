const createError = require('http-errors');
const mongoose = require('mongoose');

const Goals = require('../database/models/goals.model');
const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Professional = require('../database/models/professional.model');

module.exports = {
    getAllGoalsByUserId: async (req, res) => {
        try {
            const {patient_id} = req.body;
            const results = await Goals.find({patient_id});
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateGoal: async (req, res) => {
        try {
            const { patient_id } = req.body;
            const filter = { patient_id: patient_id };
            const data = await Goals.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertGoals: async (req, res) => {
        try {
            const newGoals = new Goals(req.body);
            const goals = await newGoals.save();
            const { patient_id, profissional_id } = req.body;
            const filter = { patient_id: patient_id };
            const update = { "$addToSet": { profissionals: profissional_id, goals: goals._id } };
            console.debug(patient_id)
            console.debug(profissional_id)
            const data = await PatientData.findOneAndUpdate(filter, update, { new: true, 
                                                                            useFindAndModify: false });

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    deleteGoal: async (req, res) => {
        try {
            const {patient_id} = req.body;
            const results = await Goals.findOneAndDelete({patient_id}, {useFindAndModify:false});
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    }

    
}