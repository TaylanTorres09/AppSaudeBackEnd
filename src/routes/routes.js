const express = require('express')
const routes = express.Router()

const PatientController = require('../controllers/patientController');

routes.use(require('../middleware/authJwt'));

//Patient
routes.use(require('../auth/patientAuth'))
routes.use(require('../auth/patientRegister'))

//Professional
routes.use(require('../auth/professionalAuth'))
routes.use(require('../auth/professionalRegister'))



routes
    // Users
    .get('/', PatientController.getAll)
    .post('/', PatientController.newPatient)
module.exports = routes

