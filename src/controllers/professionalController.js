const createError = require('http-errors');
const mongoose = require('mongoose');

const Professional = require('../database/models/professional.model');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const results = await Professional.find()
            res.send( results);
        } catch (error) {
            console.log(error.message);
        }
    },
    getUserByID: async (req, res) => {
        try {
            const results = await Professional.findById(req.params.id);

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
    }


}