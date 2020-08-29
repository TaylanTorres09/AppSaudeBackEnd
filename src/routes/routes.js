const express = require('express')
const routes = express.Router()

//Middleware - Proteção
const authJwt = require('../middleware/authJwt');

//Patient
const PatientController = require('../controllers/patientController');
const PatientAuth = require('../auth/patientAuth')
const PatientRegister = require('../auth/patientRegister')

//Professional
const ProfessionalController = require('../controllers/professionalController')
const ProfessionalAuth = require('../auth/professionalAuth')
const ProfessionalRegister = require('../auth/professionalRegister')


routes
    // Users - Patient
    .get('/all/patient', PatientController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], PatientController.getAll) // Rota protegida

    // Users - Professional
    .get('/all/professional', ProfessionalController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], ProfessionalController.getAll) // Rota protegida

    // Patient
    .post('/api/patient/authentication', PatientAuth.loginPatient)
    .post('/api/patient/register', PatientRegister.registerPatient)
    .get('/api/patient/:id', PatientController.getUserByID)
    .get('/api/patient', PatientController.getUserByEmail) // http://localhost:3000/api/patient?email=maods@maods.com

    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)
    .get('/api/professional/:id', PatientController.getUserByID)
    .get('/api/patient', PatientController.getUserByEmail) // http://localhost:3000/api/professional?email=

    


module.exports = routes

