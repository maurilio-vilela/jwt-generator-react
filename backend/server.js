// backend/server.js  
const express = require('express');  
const cors = require('cors');  

const app = express();  
const PORT = process.env.PORT || 5000;  

app.use(cors());  
app.use(express.json());  

app.get('/', (req, res) => {  
    res.send('API está funcionando!');  
});  

// Rota para gerar a chave JWT (exemplo, não faz nada aqui, pode ser usada em uma aplicação real)  
app.post('/generate-key', (req, res) => {  
    const { length, options } = req.body;  
    // Lógica para gerar uma chave JWT pode ser implementada aqui.  
    // Aqui está um exemplo simples de geração de chave.  
    const generatedKey = generateRandomKey(length, options);  
    res.json({ key: generatedKey });  
});  

const generateRandomKey = (length, options) => {  
    // Exemplo simples de geração de chave aleatória  
    let characters = '';  
    if (options.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';  
    if (options.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
    if (options.numbers) characters += '0123456789';  
    if (options.specials) characters += '!@#$%^&*()_+[]{}|;:,.<>?';  
    
    let result = '';  
    for (let i = 0; i < length; i++) {  
        result += characters.charAt(Math.floor(Math.random() * characters.length));  
    }  
    
    return result;  
};  

app.listen(PORT, () => {  
    console.log(`Servidor rodando na porta ${PORT}`);  
});
const path = require('path');  

app.use(express.static(path.join(__dirname, '../frontend/build')));  

app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));  
});