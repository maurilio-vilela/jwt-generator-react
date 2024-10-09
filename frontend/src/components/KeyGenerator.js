import React, { useState } from 'react';  
import { Button, Form, Alert } from 'react-bootstrap';  
import axios from 'axios';  

const KeyGenerator = () => {  
    const [payload, setPayload] = useState('');  
    const [generatedToken, setGeneratedToken] = useState('');  
    const [error, setError] = useState('');  

    const handleGenerateToken = async () => {  
        try {  
            const response = await axios.post('http://localhost:5000/api/jwt/generate', { payload: JSON.parse(payload) });  
            setGeneratedToken(response.data.token);  
            setError('');  
        } catch (err) {  
            setError('Erro ao gerar o token: ' + err.message);  
        }  
    };  

    return (  
        <div>  
            <Form>  
                <Form.Group controlId="formPayload">  
                    <Form.Label>Payload (JSON format)</Form.Label>  
                    <Form.Control   
                        as="textarea"   
                        rows={3}   
                        value={payload}   
                        onChange={(e) => setPayload(e.target.value)}   
                        placeholder='{"key": "value"}'  
                    />  
                </Form.Group>  
                <Button variant="primary" onClick={handleGenerateToken}>Gerar JWT</Button>  
            </Form>  
            {generatedToken && (  
                <Alert className="mt-4" variant="success">  
                    Token Gerado: {generatedToken}  
                </Alert>  
            )}  
            {error && (  
                <Alert className="mt-4" variant="danger">  
                    {error}  
                </Alert>  
            )}  
        </div>  
    );  
};  

export default KeyGenerator;