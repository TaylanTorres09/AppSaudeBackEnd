const jwt = require('jsonwebtoken')
const secret = 'segredo'


// Analisando o token, geral:

verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    if(!token)
        return res.status(403).send({message: 'No token provided'});
    
    if(token.split(' ').length === 2)
        return res.status(401).send({message: 'Token error'});
    
    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(401).send({message: 'Unauthorized, token invalid!'})
    })
    const scheme  = parts;
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({message: 'Token malformatted'})

    next()
}

module.exports = verifyToken;