const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const email = req.body.email.trim().toLowerCase()

    // // check if user already exists
    const userResult = await pool.query(`select username from users where username = $1`, [username])
    if (userResult.rowCount != 0) {
      return res.status(409).json({ message: "username already in use" })
    }

    const emailResult = await pool.query(`select email from users where email = $1`, [email])
    if (emailResult.rowCount != 0) {
      return res.status(409).json({ message: "email already in use" })
    }

    // // hash password 
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)

    // add user to database
    const newUser = await pool.query(`insert into users (username , email , password_hash) values ($1 , $2 , $3) returning user_id , username`, [username, email, password_hash])

    res.status(201).json({ username: newUser.rows[0].username, message: "Succefully registered" })

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Register user error:', error);
    }
    return res.status(500).json({ message: "internal server error" })
  }
};

const loginUser = async (req, res) => {
  try {
    const password = req.body.password.trim();
    const email = req.body.email.toLowerCase().trim()
    // find user using email 
    const result = await pool.query(`select user_id , password_hash , username from users where LOWER(email) = $1`, [email])

    if (result.rowCount == 0)
      return res.status(401).json({ message: "Invalid email or password" })

    //verify password
    const password_hash = result.rows[0].password_hash

    if (! await bcrypt.compare(password, password_hash)) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // sign jwt token
    const token = jwt.sign({ id: result.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour in milliseconds
      });

    res.status(200).json({ token, username: result.rows[0].username,user_id : result.rows[0].user_id, message: "Successfully logged in" })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Login error:', error);
    }
    res.status(500).json({ message: "internal server error" })
  }
};

const logoutUser = (req, res) => {
  try {
    // Clear the JWT token cookie
    if (!req.cookies.token){
      res.status(401).json({message : "no active session"})
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    return res.status(200).json({ message: "Successfully logged out" });

  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Logout error:', error);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser , logoutUser};
