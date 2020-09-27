const createError = require('http-errors');
const mongoose = require('mongoose');

const PatientData = require('../database/models/patienteData.model');
const Patient = require('../database/models/patient.model');
const Profissional = require('../database/models/professional.model');


module.exports = {
    getDataByUserId: async (req, res) => {
        try {
            const result = await PatientData
                            .findOne({ patient_id: req.body.patient_id})
                            .lean()
                            .populate({ path: 'patient_id'  })

            return res.send(result);

        } catch (error) {
            console.log(error.message);
        }
    },
    getProfissional: async (req, res) => {
        try {
            console.debug(req.body)
            const results = await PatientData
                .findOne({ patient_id: req.body.patient_id })
                .select('profissionals')
                .lean()
                .populate({ path: 'profissionals' })


            return res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },
    createData: async (req, res) => {
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
            const { patient_id } = req.body;

            const {email} = req.body;
            const { _id } = await Profissional.findOne({email: email});

            const filter = { patient_id: patient_id };
            const update = { "$push": { profissionals: _id } };
            const data = await PatientData.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });

            res.send({ data })
        } catch (error) {
            console.log(error.message);
            res.send('Erro')
        }
    }


}