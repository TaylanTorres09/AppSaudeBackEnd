const jwt = require('jsonwebtoken')
const secret = 'segredo'


// Analisando o token, geral:
module.exports = {
    verifyToken: async (req, res, next) => {
        const token = req.headers["x-access-token"]

        if (!token)
            return res.status(403).send({ message: 'No token provided' });

        if (token.split(' ').length === 2)
            return res.status(401).send({ message: 'Token error' });

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: 'Unauthorized, token invalid!' });
            req.userId = decoded.id;
            return next();
        })
    }

}