const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController.js');
const schemauserRegisterSchema = require('../schemaValidation/registerSchema.js');
const validateRegisterSchema = require('../middlewares/validateRegisterSchema.js')
const validateToken  = require('../middlewares/validateJwtToken.js')

router.post('/register', schemauserRegisterSchema , validateRegisterSchema , registerUser);
router.post('/login' , loginUser);

module.exports = router
