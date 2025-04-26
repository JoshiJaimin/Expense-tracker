const pool = require('../db');

const addExpense = async (req, res) => {
    try{
        const user_id = req.user.id;
        const { amount, description, category, expense_date } = req.body;
        const newExpense = await pool.query(
            `INSERT INTO expenses 
                (user_id, amount, description, category, expense_date) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING expense_id, user_id, amount, description, category, 
                      expense_date, created_at`,
            [user_id, amount, description, category, expense_date]
        );

        if (newExpense.rowCount === 0) {
            return res.status(500).json({ message: "Failed to add expense" });
        }

        return res.status(201).json({ 
            expense: newExpense.rows[0], 
            message: "Expense added successfully" 
        });
    }catch(error){
        if (process.env.NODE_ENV !== 'production') {
            console.error('Add Expense error:', error);
        }
        return res.status(500).json({ message: "internal server error" })
    }
};

module.exports = { addExpense};