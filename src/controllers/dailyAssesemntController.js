const createError = require('http-errors');
const mongoose = require('mongoose');

const Daily = require('../database/models/dailyAssessment.model');
const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Professional = require('../database/models/professional.model');

module.exports = {
    getDailyByUserID: async (req, res) => {
        try {
            const now = new Date();
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const results = await Daily.find({patient_id: req.body.id, created_on: {$gte: startOfToday}});
            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateDaily: async (req, res) => {
        try {
            const { patient_id } = req.body;
            //const {createdAt} = Date.now;
            const data = await Daily.findOneAndUpdate({patient_id}, req.body, { new: true, 
                                                                                useFindAndModify: false });
            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    create: async (req, res) => {
        const {patient_id}  = req.body;
        try {
            const newDaily = new Daily(req.body);
            //const filter = { patient_id: req.body.patient_id };
            const daily = await newDaily.save();
            const update =  { "$set": {daily: daily._id} };
           // console.debug(patient_id)
            const data = await PatientData.findOneAndUpdate({patient_id}, update, {useFindAndModify: false})
                    
            res.send({data, daily})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }

    
}