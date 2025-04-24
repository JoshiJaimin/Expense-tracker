const express = require('express');
const router = express.Router();
const { registerUser, loginUser , logoutUser} = require('../controllers/authController.js');
const  {userLoginSchema , userRegisterSchema}= require('../schemaValidation/authSchema.js');
const validateSchema = require('../middlewares/validateSchema.js')
const validateToken  = require('../middlewares/validateJwtToken.js')

router.post('/register', userRegisterSchema, validateSchema , registerUser);
router.post('/login' , userLoginSchema , validateSchema , loginUser);

router.post('/logout' ,   logoutUser);


module.exports = router
