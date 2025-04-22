require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const validateToken = (req, res, next) => {
    // pass token in headers Authorization Bearer token
    try {
        const authHeader = req.headers['authorization']
        
        if (!authHeader)
            return res.status(400).json({ "message": "no authorization header" })

        token = authHeader.split(' ')[1] || authHeader

        const decode = jwt.verify(token = token, JWT_SECRET)
        
        req.user_id = decode.id

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ "error": 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ "error": 'Invalid token' });
        }
        return res.status(500).json({ "message": "internal server error" })
    }
    next()
}

module.exports = validateToken