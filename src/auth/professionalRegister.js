const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Professional = require('../database/models/professional.model')
const ProfessionalData = require('../database/models/profissionalData.model');
const secret = require('../secret/secret.json')

module.exports = {
    registerProfessional: async (req, res) => {
        const { firstName, lastName, email, password, Doc } = req.body
        try {
            if (await Professional.findOne({ email })) {
                return res.status(400).send({ message: 'User exists' });
            }

            const newProfessional = new Professional({  email: email, password: password });
            const user = await newProfessional.save();
            const newProfessionalData = new ProfessionalData({ profissional_id: user._id, firstName: firstName, lastName: lastName, Doc: Doc});
            const data = await newProfessionalData.save();
            const userUpdated = await Professional.findOneAndUpdate({ _id: user._id }, { profissionalData: data._id }, { new: true, useFindAndModify: false });

            user.password = undefined;
            const token = jwt.sign({ id: user.id }, secret.secret, {
                expiresIn: 86400
            })
            const role = "Professional" 
            res.send({ user, token, role });
        }

        catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    }
}