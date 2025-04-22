const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const {username , email , password} = req.body

    // // check if user already exists
    const result = await pool.query(`select username from users where username = $1`, [username])
    console.log(result)
    if(result.rowCount != 0){
      return res.statkus(403).json({"message":"user already exist"})
    }

    // // hash password 
    const saltRounds = 10
    password_hash = await bcrypt.hash(password , saltRounds)

    // add user to database
    const newUser = await pool.query(`insert into users (username , email , password_hash) values ($1 , $2 , $3) returning user_id , username`,[username , email , password_hash])

    // jwt token
    const token = jwt.sign({ id: newUser.rows[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    
    res.status(201).json({token , user : newUser.rows[0]})

  } catch (error) {
    console.log(`error in registerUser error : ${error}`)
    return res.status(500).json({message : "internal server error"})
  }
};



const loginUser = async (req, res) => {
 console.log(req.user_id)
  res.send("login")

};

module.exports = { registerUser, loginUser };
