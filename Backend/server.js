const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();

const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);

process.on('uncaughtException', (err, origin) => {
    console.error('Uncaught Exception:', err);
    console.error('Exception Origin:', origin);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send("hello")
});
  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});