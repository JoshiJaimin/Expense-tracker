const pool = require('../db');

const addExpense = async (req, res) => {
    const { user_id, amount, description, category, expense_date } = req.body;
    if (!user_id || !amount || !description || !category || !expense_date) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try{
        const user_id = req.body.user_id;
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category; 
        const expense_date = req.body.expense_date;
        const userResult = await pool.query(`select username from users where user_id = $1`, [user_id]);
        if(!userResult){
            return res.status(404).json({ message: "user not found" });
        }
        const newExpense = await pool.query(`insert into expenses (user_id , amount , description, category, expense_date) values ($1 , $2 , $3, $4, $5) returning expense_id,user_id, amount, description,category,expense_date`, [user_id, amount, description,category,expense_date]);
        res.status(201).json({ expense: newExpense.rows[0], message: "Expense Added" })
    }catch(error){
        if (process.env.NODE_ENV !== 'production') {
            console.error('Add Expense error:', error);
        }
        return res.status(500).json({ message: "internal server error" })
    }
};

module.exports = { addExpense};