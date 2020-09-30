const createError = require('http-errors');
const mongoose = require('mongoose');

const moment= require('moment')

const Goals = require('../database/models/goals.model');
const PatientData = require('../database/models/patienteData.model');

module.exports = {
    getAllGoalsByUserId: async (req, res) => {
        try {
            const {patient_id} = req.body;
            const results = await Goals.Goals.find({patient_id});
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateGoal: async (req, res) => {
        try {
            const { patient_id } = req.body;
            const filter = { patient_id: patient_id };
            const data = await Goals.Goals.findOneAndUpdate(filter, req.body, 
                                                            { new: true, useFindAndModify: false });
            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertGoals: async (req, res) => {
        try {
            const newGoals = new Goals.Goals(req.body);
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
            const results = await Goals.Goals.findOneAndDelete({patient_id}, {useFindAndModify:false});
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },

    CheckGoals: async (req, res) => {
        try {
            const {active, meta_id} = req.body;

            if (active == 1){
                const newCheck = new Goals.Check(req.body);
                const check = await newCheck.save();
                const update = {"$set": {checks: check._id}};
                await Goals.Goals.findByIdAndUpdate(meta_id, update, {useFindAndModify:false})
                res.send({check});
            }else{
                const del = await Goals.Check.findOneAndDelete(meta_id, {useFindAndModify:false});
                res.send(del)
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    Checkout: async (req, res) => {
        try {
            // start today
            var start = moment().startOf('day');
            // end today
            var end = moment(Date.now()).endOf('day');

            console.log(start,end)
            const results = await Goals.Check.find({createdAt: { '$gte': start, '$lte': end }});
          
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }  
    },

}