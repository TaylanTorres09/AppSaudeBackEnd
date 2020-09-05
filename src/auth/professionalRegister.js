const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Professional = require('../database/models/professional.model')
const ProfessionalData = require('../database/models/profissionalData.model');
const secret = 'f36e0a6c9e1011cfacd75f6ea0c96610'

module.exports = {
    registerProfessional: async (req, res) => {
        const { email } = req.body
        try {
            if (await Professional.findOne({ email })) {
                return res.status(400).send({ message: 'User exists' });
            }

            const newProfessional = new Professional(req.body);
            const user = await newProfessional.save();
            const newProfessionalData = new ProfessionalData({ profissional_id: user._id });
            const data = await newProfessionalData.save();
            const userUpdated = await Professional.findOneAndUpdate({ _id: user._id }, { profissionalData: data._id }, { new: true, useFindAndModify: false });

            user.password = undefined;
            const token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 86400
            })
            res.send({ user, token });
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