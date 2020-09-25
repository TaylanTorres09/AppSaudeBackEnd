const moment= require('moment') 
const createError = require('http-errors');
const mongoose = require('mongoose');


const Daily = require('../database/models/dailyAssessment.model');
const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Professional = require('../database/models/professional.model');

module.exports = {
    getDailyByUserID: async (req, res) => {
        try {
            // start today
            var start = moment().startOf('day');
            // end today
            var end = moment(Date.now()).endOf('day');
            
            const results = await Daily.find({patient_id: req.body.patient_id, createdAt: { '$gte': start, '$lte': end }});
          
            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    updateDaily: async (req, res) => {
        try {
            const { patient_id } = req.body;
            var start = moment().startOf('day');
            var end = moment(Date.now()).endOf('day');
            
            const data = await Daily.findByIdAndUpdate({
                patient_id: patient_id, createdAt: 
                { '$gte': start, '$lte': end }}, req.body, { new: true, useFindAndModify: false });

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