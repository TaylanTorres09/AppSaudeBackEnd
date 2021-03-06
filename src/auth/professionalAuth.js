// login patient:
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Professional = require('../database/models/professional.model')
const secret = require('../secret/secret.json')

module.exports = {
    loginProfessional: async (req, res) => {
        const { email, password } = req.body;
        const user = await Professional.findOne({ email }).select('+password')

        if (!user)
            return res.status(400).send({ message: 'User not found' })

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ message: 'Email or password is wrong' });

        user.password = undefined

        const token = jwt.sign({ id: user.id }, secret.secret, {
            expiresIn: 86400
        })
        const role = "Professional" 
        res.send({ user, token , role })
    }
}