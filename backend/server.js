// backend/server.js  
const express = require('express');  
const cors = require('cors');  
const jwt = require('jsonwebtoken');  
const bodyParser = require('body-parser');  
require('dotenv').config();  

const app = express();  
const PORT = process.env.PORT || 5000;  

app.use(cors());  
app.use(bodyParser.json());  

app.post('/api/jwt/generate', (req, res) => {  
    const payload = req.body.payload;  
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });  
    res.json({ token });  
});  

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});