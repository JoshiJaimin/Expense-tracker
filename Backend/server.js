const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const app = express();

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cookieParser());
app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("hello")
});
  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});