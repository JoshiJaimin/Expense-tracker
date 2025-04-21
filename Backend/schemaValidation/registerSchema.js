const { validationResult , body} = require('express-validator')

const userRegisterSchema = [
body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

body('password')
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage(`password must be min of 8 character,should contain at least 1 lower , 1 upper , 1 number , 1 symbol`),

body('email')
    .isEmail()
    .withMessage("email should be in valid format")
]

module.exports = userRegisterSchema;

