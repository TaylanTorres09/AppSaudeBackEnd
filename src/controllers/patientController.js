const createError = require('http-errors');
const mongoose = require('mongoose');

const Patient = require('../database/models/patient.model');
const PatientData = require('../database/models/patienteData.model');



module.exports = {
    //Teste
    getAll: async (req, res, next) => {
        try {
            const results = await PatientData.find().populate("patient_id").exec();
            // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
            // const results = await Product.find({ price: 699 }, {});
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    // produção
    getUserByID: async (req, res, next) => {
        try {
            const results = await Patient.find()
            // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
            // const results = await Product.find({ price: 699 }, {});
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }
    },
    
    getUserByID: async (req, res) => {
        try {
            const results = await Patient.findById(req.params.id);

            return res.send( results);
        } catch (error) {
            console.log(error.message);
        }
    },
    getUserByEmail: async (req, res) => {
        try {
            const results = await Patient.findOne({email: req.query.email});
            return res.json(results);

        } catch (error) {
            console.log(error.message);
        }
    },
    
}