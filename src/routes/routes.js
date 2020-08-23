const express = require('express')
const routes = express.Router()

const PatientController = require('../controllers/patientController/index');





routes
    // Users
    .get('/', PatientController.getAll)
    .post('/', PatientController.newPatient)
module.exports = routes

