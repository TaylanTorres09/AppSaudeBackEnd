const express = require('express')
const routes = express.Router()

const PatientController = require('../controllers/patientController');





routes
    // Users
    .get('/', PatientController.getAll)
    .post('/', PatientController.newPatient)
module.exports = routes

