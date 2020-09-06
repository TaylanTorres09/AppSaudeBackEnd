// login patient:
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Patient = require('../database/models/patient.model')
const secret = require('../secret/secret.json')

module.exports = {

    loginPatient: async (req, res) => {
        const { email, password } = req.body;
        const user = await Patient.findOne({ email }).select('+password')

        if (!user)
            return res.status(400).send({ message: 'User not found' })

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ message: 'Email or password is wrong' });

        user.password = undefined

        const token = jwt.sign({ id: user.id }, secret.secret, {
            expiresIn: 86400
        })

        res.send({ user, token })
    }
}
