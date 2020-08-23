const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Professional = require('../database/models/professional.model')
const secret = 'f36e0a6c9e1011cfacd75f6ea0c96610'

module.exports = async (req, res) => {
    const {email} = req.body
    try {
        if(await User.findOne({ email })){
            return res.status(400).send({message: 'User exists'});
        }

        const user = await Professional.create(req.body);
        
        user.password = undefined;

        const token = jwt.sign({id: user.id}, secret, {
            expiresIn: 86400
        })

        return res.send({user, token});
    } catch (err) {
        return res.status(400).send({message: 'Register failed'});
    }
}