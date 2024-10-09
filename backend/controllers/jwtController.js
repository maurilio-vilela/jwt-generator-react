const jwt = require('jsonwebtoken');  

const generateJwt = (req, res) => {  
    const { payload } = req.body;  
    if (!payload) {  
        return res.status(400).json({ message: 'Payload is required' });  
    }  

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });  
    res.status(200).json({ token });  
};  

module.exports = { generateJwt };