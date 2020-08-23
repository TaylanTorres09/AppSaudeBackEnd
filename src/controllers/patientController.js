const createError = require('http-errors');
const mongoose = require('mongoose');

const Patient = require('../models/patient.model');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const results = await Patient.find();
            // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
            // const results = await Product.find({ price: 699 }, {});
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }
    },

    newPatient: async (req, res, next) => {
        try {
          const newPatient = new Patient(req.body);
          const result = await newPatient.save();
          res.send(result);
        } catch (error) {
          console.log(error.message);
          if (error.name === 'ValidationError') {
            next(createError(422, error.message));
            return;
          }
          next(error);
        }
    }
}