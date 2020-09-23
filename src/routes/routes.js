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

//DailyAssessment
const DailyAssessment = require('../controllers/dailyAssesemntController')

//Goals
const Goals = require('../controllers/goalsControllers')


routes
    // Users - Patient
    .get('/', PatientController.getAll)
    .get('/all/patient', PatientController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], PatientController.getAll) // Rota protegida

    // Users - Professional
    .get('/all/professional', ProfessionalController.getAll)
    .get('/all/patient/test', [authJwt.verifyToken], ProfessionalController.getAll) // Rota protegida

    // Patient
    .post('/api/patient/authentication', PatientAuth.loginPatient)//(v)
    .post('/api/patient/register', PatientRegister.registerPatient)//(v)
    .get('/api/patient/:id', PatientController.getUserByID)
    .get('/api/patient', PatientController.getUserByEmail) // http://localhost:3000/api/patient?email=maods@maods.com

    // PatientData
    .get('/api/patient/data/myprofile', PatientDataController.getDataByUserId) // Rota para retornar o perfil.
    .post('/api/patient/data', PatientDataController.createData) 
    .put('/api/patient/data/upmyprofile', PatientDataController.updateData)// Atualizar dados
    .put('/api/patient/data/professionalInsertion', PatientDataController.insertProfissional)// (v)
    .post('/api/professional/data/myprofissional', PatientDataController.getProfissional) // (v)

    // Professional
    .post('/api/professional/authentication', ProfessionalAuth.loginProfessional)//(v)
    .post('/api/professional/register', ProfessionalRegister.registerProfessional)//(v)
    .get('/api/professional/:id', ProfessionalController.getUserByID)
    .get('/api/professional', ProfessionalController.getUserByEmail) // http://localhost:3000/api/professional?email=
    .get('/api/professional/patientdata/:id', ProfessionalController.getUserCuidadorId)

    // ProfessionalData
    .post('/api/professional/data/myprofile', ProfessionalDataController.getDataByUserId) //(v)
    .post('/api/professional/data/mypatients', ProfessionalDataController.getPatientes) // (v)
    .put('/api/professional/data', ProfessionalDataController.updateData)
    .put('/api/professional/data/patientInsertion', ProfessionalDataController.insertPatient) // (v)

    //dailyAssessment
    .get('/api/daily/assessment/user', DailyAssessment.getDailyByUserID)
    .put('/api/daily/assessment/updaily', DailyAssessment.updateDaily)
    .post('/api/daily/assessment/newdaily', DailyAssessment.create)

    //goals
    .get('/api/goals/id', Goals.getAllGoalsByUserId)
    .put('/api/goals/insert/profissional', Goals.insertProfissional)
    .put('/api/goals/up', Goals.updateGoal)

    

module.exports = routes

