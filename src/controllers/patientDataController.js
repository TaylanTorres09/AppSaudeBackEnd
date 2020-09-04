const createError = require('http-errors');
const mongoose = require('mongoose');

const PatientData = require('../database/models/patienteData.model');
const Patient = require('../database/models/patient.model')

module.exports = {
    getDataByUserId: async (req, res) => {
        try {
            const results = await PatientData.findById(req.params.id);

            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }  
    },
    createData: async (req, res) => {
        try {
            const newPatientData = new PatientData(req.body);
            const newUser = await Patient.findById(newPatientData.patientId).populate('PatientData');
            console.log(newUser)
            
            if(newUser){
                const data = await newPatientData.save();
                res.send({data})
            }else{
                res.status(403).send({message: 'Usuário nulo'})
            }
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },
    updateData: async (req, res) => {
        try {
            const data = await PatientData.findOneAndUpdate(req.params.id, req.body);

            res.send({data})
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }
}