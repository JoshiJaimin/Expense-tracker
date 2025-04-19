const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // <-- This is important!

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API is running');
});
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
