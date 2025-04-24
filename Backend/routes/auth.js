const express = require('express');
const router = express.Router();
const { registerUser, loginUser , logoutUser} = require('../controllers/authController.js');
const { addExpense} = require('../controllers/expenseController.js');

const  {userLoginSchema , userRegisterSchema, expenseSchema}= require('../schemaValidation/authSchema.js');
const validateSchema = require('../middlewares/validateSchema.js')
const validateToken  = require('../middlewares/validateJwtToken.js')

router.post('/register', userRegisterSchema, validateSchema , registerUser);
router.post('/login' , userLoginSchema , validateSchema , loginUser);
router.post('/addExpense' ,validateToken, expenseSchema , validateSchema , addExpense);
router.post('/logout' ,   logoutUser);


module.exports = router
