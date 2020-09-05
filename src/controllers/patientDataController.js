const createError = require('http-errors');
const mongoose = require('mongoose');

const PatientData = require('../database/models/patienteData.model');
const Patient = require('../database/models/patient.model');
const Professional = require('../database/models/professional.model');

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
            const { patient_Id } = req.body;
            const filter = { patient_Id: patient_Id };
            const data = await PatientData.findOneAndUpdate(filter, req.body, { new: true, useFindAndModify: false });
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