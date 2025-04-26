const express = require('express');
const router = express.Router();
const { addExpense} = require('../controllers/expenseController.js');
const  { addexpenseSchema}= require('../schemaValidation/expenseSchema.js');

const validateSchema = require('../middlewares/validateSchema.js')
const validateToken  = require('../middlewares/validateJwtToken.js')

router.post('/' ,validateToken, addexpenseSchema , validateSchema , addExpense);

module.exports = router