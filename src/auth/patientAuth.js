// login patient:
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Patient = require('../database/models/patient.model')
const secret = require('../secret/secret.json')
const PatientData = require('../database/models/patienteData.model');

module.exports = {

    loginPatient: async (req, res) => {
        const { email, password } = req.body;
        const result = await Patient.findOne({ email }).select('+password')

        if (!result)
            return res.status(400).send({ message: 'User not found' })

        if (!await bcrypt.compare(password, result.password))
            return res.status(400).send({ message: 'Email or password is wrong' });

        const user = await PatientData
            .findOne({ patient_id: result._id})
            .lean()
            .populate({ path: 'patient_id'  })

      

        result.password = undefined
        const token = jwt.sign({ id: result._id }, secret.secret, {
            expiresIn: 86400
        })
        const role =  "Pacient"
        res.send({ user, token, role })
    }
}
