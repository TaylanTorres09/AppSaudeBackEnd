const express = require('express')
const routes = express.Router()

const authJwt = require('../middleware/authJwt');

const PatientController = require('../controllers/patientController');

//Patient
const PatientAuth = require('../auth/patientAuth')
const PatientRegister = require('../auth/patientRegister')

//Professional
const ProfessionalAuth = require('../auth/professionalAuth')
const ProfessionalRegister = require('../auth/professionalRegister')


routes
    // Users
    .get('/', PatientController.getAll)
    .get('/test', [authJwt.verifyToken], PatientController.getAll)

    // Patient
    .post('/api/patient/authentication', PatientAuth.loginPatient)
    .post('/api/patient/register', PatientRegister.registerPatient)
    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)

module.exports = routes

