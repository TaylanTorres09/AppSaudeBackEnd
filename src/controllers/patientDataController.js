const createError = require('http-errors');
const mongoose = require('mongoose');

const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');
const Profissional = require('../database/models/professional.model');
const ProfessionalData = require('../database/models/profissionalData.model');


module.exports = {
    getDataByUserId: async(req, res) => {
        try {
            const result = await PatientData
                .findOne({ patient_id: req.body.patient_id })
                .lean()
                .populate({ path: 'patient_id' })

            return res.send(result);

        } catch (error) {
            console.log(error.message);
        }
    },
    getProfissional: async(req, res) => {
        try {
         
            const results = await PatientData
                .findOne({ patient_id: req.body.patient_id })
                .select('profissionals')
                .lean()
                .populate({ 
                    path: 'profissionals',
                    populate: {
                        path: 'profissionalData',
                    }
                })


            return res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    createData: async(req, res) => {
        try {
            const newPatientData = new PatientData(req.body);
            const newUser = await Patient.findById(newPatientData.patient_id).populate('PatientData');
            console.log(newUser)

            if (newUser) {
                const data = await newPatientData.save();
                res.send({ data })
            } else {
                res.status(403).send({ message: 'Usuário nulo' })
            }
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },
    updateData: async(req, res) => {
        try {
            if (req.body.weight && req.body.height) {
                var imc = req.body.weight / req.body.height ** 2
                req.body.imc = imc.toFixed(2)
            }
            const { patient_id, ...rest } = req.body;

            console.log(rest)
            const filter = { patient_id: patient_id };
            const data = await PatientData.findOneAndUpdate(filter, rest, { new: true, useFindAndModify: false });
            console.log(data)

            res.send({ data })

        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    },

    insertProfissional: async(req, res) => {
        try {
            const { patient_id,  email } = req.body;

  
            const { _id } = await Profissional.findOne({ email: email });

            const filter_patient = { patient_id: patient_id };
            const update_patient = { "$push": { profissionals: _id } };
            const data_patient = await PatientData.findOneAndUpdate(filter_patient, update_patient, { new: true, useFindAndModify: false });

            const filter_profissional = { profissional_id: _id };
            const update_profissional = { "$push": { patients: patient_id } };
            const data_profissional = await ProfessionalData.findOneAndUpdate(filter_profissional, update_profissional, { new: true, useFindAndModify: false });
            
            res.send({ data_patient })
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }


}