const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({message: "Invalid authorization format" })
        }
        const decode = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ "error": 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ "error": 'Invalid token' });
        }
        console.log(error)
        return res.status(500).json({ "message": "internal server error" })
    }
}

module.exports = validateToken