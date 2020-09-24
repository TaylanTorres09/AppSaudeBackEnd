const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Patient = require('../database/models/patient.model')
const PatientData = require('../database/models/patienteData.model')

const secret = require('../secret/secret.json')

function generateAccessToken(user) {
    return jwt.sign(user, secret.secret, { expiresIn: 86400 })
}

module.exports = {
    registerPatient: async (req, res, next) => {
        const { email } = req.body
        try {

            if (await Patient.findOne({ email: email })) {
                return res.status(400).send({ message: 'User exists' });
            }

            const newPatient = new Patient(req.body);
            const user = await newPatient.save();
            const newPatientData = new PatientData({ patient_id: user._id });
            const data = await newPatientData.save();
            const userUpdated = await Patient.findOneAndUpdate({ _id: user._id }, { patientData: data._id }, { new: true, useFindAndModify: false });
            // user.patientData = data._id
            user.password = undefined;
            const token = generateAccessToken({ id: user.id });
            const role =  "Pacient"
            res.send({ user, token, role });

        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    }
}
