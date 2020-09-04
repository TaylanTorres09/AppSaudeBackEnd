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
<<<<<<< HEAD
    // Users - Patient
    .get('/all/patient', PatientController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], PatientController.getAll) // Rota protegida

    // Users - Professional
    .get('/all/professional', ProfessionalController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], ProfessionalController.getAll) // Rota protegida
=======
    // GEt all patient (test)
    .get('/', PatientController.getAll)
>>>>>>> master

    // Patient
    .post('/api/patient/authentication', PatientAuth.loginPatient)
    .post('/api/patient/register', PatientRegister.registerPatient)
<<<<<<< HEAD
    .get('/api/patient/:id', PatientController.getUserByID)
    .get('/api/patient', PatientController.getUserByEmail) // http://localhost:3000/api/patient?email=maods@maods.com

    // PatientData
    .get('/api/patient/data/:id', PatientDataController.getDataByUserId)
    .post('/api/patient/data', PatientDataController.createData) 
    .put('/api/patient/data/:id', PatientDataController.updateData)
    
    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)
    .get('/api/professional/:id', ProfessionalController.getUserByID)
    .get('/api/professional', ProfessionalController.getUserByEmail) // http://localhost:3000/api/professional?email=
    .get('/api/professional/patientdata/:id', ProfessionalController.getUserCuidadorId)

    // ProfessionalData
    .get('/api/professional/data/:id', ProfessionalDataController.getDataByUserId)
    .post('/api/professional/data', ProfessionalDataController.createData) 
    .put('/api/professional/data/:id', ProfessionalDataController.updateData)


=======
    // .get('/api/patient/:id') ->  PatientController.getUserByID
    // .get('/api/patient/:email') ->  PatientController.getUserByEmail

    // PatientData
    // .get('/api/patient/data') ->  PatientController.getDataByUserID
    .post('/api/patient/data',  PatientController.createPatientData) 
    // .update('/api/patient/data') ->  PatientController.updateData

    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)
    // .get('/api/professional/:id') ->  ProfissionalController.getUserByID
    // .get('/api/professional/:email') ->  ProfissionalController.getUserByEmail

    // ProfessionalData
    // .get('/api/professional/data') ->  PatientController.getDataByUserID
    // .post('/api/professional/data') ->  PatientController.createData
    // .update('/api/professional/data') ->  PatientController.updateData


    // dailyAssesemnt
    // .get('/api/dailyAssesemnt') ->  dailyAssesemntController.getDataByUserID
    // .post('/api/professional') ->  dailyAssesemntController.createData
    // .update('/api/dailyAssesemnt') ->  dailyAssesemntController.updateData

    // goals
    // .get('/api/goals') ->  goalsontroller.getDataByUserID
    // .post('/api/goals') ->  goalsController.createData
    // .update('/api/goals') ->  goalsController.updateData

>>>>>>> master

module.exports = routes

