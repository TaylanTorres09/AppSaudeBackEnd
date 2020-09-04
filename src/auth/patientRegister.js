const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Patient = require('../database/models/patient.model')
const PatientData = require('../database/models/patienteData.model')
const secret = 'f36e0a6c9e1011cfacd75f6ea0c96610'

function generateAccessToken(user) {
    return jwt.sign(user, secret, { expiresIn: 86400 })
}

module.exports = {
    registerPatient: async (req, res, next) => {
        const { email, data } = req.body
        try {
            if ( await Patient.findOne({ email })) {
                return res.status(400).send({ message: 'User exists' });
            }

            const newPatient = new Patient(req.body);
            const user = await newPatient.save();
            user.password = undefined;
            const token = generateAccessToken({ id: user.id });
            res.send({ user, token });
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

/*try {
    const newPatientData = new PatientData(req.body);
    
    const data = await newPatientData.save();

    res.send({data})
} catch (error) {
    console.log(error.message);
    res.send('Erro')
}*/