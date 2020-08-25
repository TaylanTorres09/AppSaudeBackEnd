const jwt = require('jsonwebtoken')
const secret = 'segredo'


// Analisando o token, geral:
module.exports = {
    verifyToken: async (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '')

        if (!token)
            return res.status(403).send({ message: 'No token provided' });

        if (token.split(' ').length === 2)
            return res.status(401).send({ message: 'Token error' });

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: 'Unauthorized, token invalid!' })
        })
        const scheme = parts;
        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send({ message: 'Token malformatted' })

        next()
    }

}




// Usar como padrãao para fazer o middleware verifi token
// https://bezkoder.com/node-js-mongodb-auth-jwt/#Controller_for_Authentication

// DA um ctrl f e procura isso no artigo
// middlewares/authJwt.js