const { body} = require('express-validator')

const baseCategories = ['Food', 'Travel', 'Shopping', 'Health', 'Entertainment', 'Utilities', 'Other'];

const lowerCaseCategories = baseCategories.map(cat => cat.toLowerCase());

const addexpenseSchema = [
    body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0, max: 1000000 }).withMessage('Amount must be between 0 and 1,000,000')
    .customSanitizer(value => parseFloat(parseFloat(value).toFixed(2))), 
  
  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 3, max: 200 }).withMessage('Description must be between 3 and 200 characters')
    .trim(),
  
  body('category')
    .notEmpty().withMessage('Category is required')
    .custom(value => {
      if (!lowerCaseCategories.includes(value.toLowerCase())) {
        throw new Error(`Category must be one of: ${baseCategories.join(', ')}`);
      }
      return true;
    })
    .customSanitizer(value => {
      const index = lowerCaseCategories.indexOf(value.toLowerCase());
      return baseCategories[index];
    }),
  
  body('expense_date')
    .notEmpty().withMessage('Expense date is required')
    .isISO8601().withMessage('Expense date must be a valid date')
    .custom(date => {
      const inputDate = new Date(date);
      const currentDate = new Date();
      
      if (inputDate > currentDate) {
        throw new Error('Expense date cannot be in the future');
      }
      
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
      if (inputDate < fiveYearsAgo) {
        throw new Error('Expense date cannot be more than 5 years in the past');
      }
      
      return true;
    }),
];

module.exports = { addexpenseSchema };
