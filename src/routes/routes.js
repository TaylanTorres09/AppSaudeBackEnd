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
    // GEt all patient (test)
    .get('/', PatientController.getAll)

    // Patient
    .post('/api/patient/authentication', PatientAuth.loginPatient)
    .post('/api/patient/register', PatientRegister.registerPatient)
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


module.exports = routes

