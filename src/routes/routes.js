const express = require('express')
const routes = express.Router()

//Middleware - Proteção
const authJwt = require('../middleware/authJwt');

//Patient
const PatientController = require('../controllers/patientController');
const PatientAuth = require('../auth/patientAuth')
const PatientRegister = require('../auth/patientRegister')

//PatientData
const PatientDataController = require('../controllers/patientDataController')

//Professional
const ProfessionalController = require('../controllers/professionalController')
const ProfessionalAuth = require('../auth/professionalAuth')
const ProfessionalRegister = require('../auth/professionalRegister')

//ProfessionalData
const ProfessionalDataController = require('../controllers/professionalDataController')


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

    // PatientData
    .get('/api/patient/data/:id', PatientDataController.getDataByUserId)
    .post('/api/patient/data', PatientDataController.createData) 
    .put('/api/patient/data/:id', PatientDataController.updateData)
    
    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)
    .get('/api/professional/:id', PatientController.getUserByID)
    .get('/api/professional', PatientController.getUserByEmail) // http://localhost:3000/api/professional?email=

    // ProfessionalData
    .get('/api/professional/data/:id', ProfessionalDataController.getDataByUserId)
    .post('/api/professional/data', ProfessionalDataController.createData) 
    .put('/api/professional/data/:id', ProfessionalDataController.updateData)



module.exports = routes

