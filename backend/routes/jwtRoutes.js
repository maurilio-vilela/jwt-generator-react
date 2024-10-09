const express = require('express');  
const { generateJwt } = require('../controllers/jwtController');  
const router = express.Router();  

router.post('/generate', generateJwt);  

module.exports = router;