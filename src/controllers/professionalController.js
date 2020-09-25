const createError = require('http-errors');
const mongoose = require('mongoose');

const Profissional = require('../database/models/professional.model');
const ProfessionalData = require('../database/models/profissionalData.model')
const PatientData = require('../database/models/patienteData.model');


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const results= await Profissional.find();
            console.log(results)
            
            res.send(results);

        } catch (error) {
            console.log(error.message);
        }
    },
    getUserByID: async (req, res) => {
        try {
            const results = await Profissional.findById(req.params.id);

            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }
    },
    getUserByEmail: async (req, res) => {
        try {
            const end = req.query.email;
            const results = await Professional.findOne({email: end});
            return res.json(results);

        } catch (error) {
            console.log(error.message);
        }
    },
    getUserCuidadorId: async (req, res) => {
        try {
            const {professional_id} = req.body;
            const cuidador = await Profissional.findById({professional_id});
            const patient = await PatientData.find({professional: cuidador});

            return res.send(patient);
        } catch (error) {
            console.log(error.message);
        }  
    },
}