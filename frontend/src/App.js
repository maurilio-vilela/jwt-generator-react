import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import './App.css'; // Para estilos personalizados

function App() {
    const [length, setLength] = useState(32);
    const [key, setKey] = useState('');
    const [options, setOptions] = useState({
        lowercase: true,
        uppercase: true,
        numbers: true,
        specials: true
    });
    const [inputKey, setInputKey] = useState('');

    useEffect(() => {
        applySavedTheme();
    }, []);

    const generateKey = async () => {
        const response = await fetch('http://localhost:5000/generate-key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ length, options })
        });
        const data = await response.json();
        setKey(data.key);
    };

    const handleChange = (e) => {
        setOptions({ ...options, [e.target.id]: e.target.checked });
    };

    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle('dark-mode');
        body.classList.toggle('bg-light');
        body.classList.toggle('bg-dark');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('bg-light');
            body.classList.add('bg-dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.remove('bg-dark');
            body.classList.add('bg-light');
        }
    };

    // Função para limpar todos os campos
    const handleClear = () => {
        setLength(32); // Resetar comprimento para 32
        setKey(''); // Limpar chave gerada
        setOptions({
            lowercase: true,
            uppercase: true,
            numbers: true,
            specials: true
        }); // Resetar opções para o estado inicial
        setInputKey(''); // Limpar o campo de input da chave
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Gerador de Chave JWT</h1>
            <div className="text-end mb-3">
                <Button variant="secondary" onClick={toggleTheme}>
                    <i className={document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </Button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group controlId="length">
                        <Form.Label>Comprimento da Chave:</Form.Label>
                        <Form.Control
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            min="1" />
                    </Form.Group>
                    <h5>Selecione os tipos de caracteres:</h5>
                    <Form.Check
                        type="checkbox"
                        id="lowercase"
                        label="Letras minúsculas"
                        checked={options.lowercase}
                        onChange={handleChange} />
                    <Form.Check
                        type="checkbox"
                        id="uppercase"
                        label="Letras maiúsculas"
                        checked={options.uppercase}
                        onChange={handleChange} />
                    <Form.Check
                        type="checkbox"
                        id="numbers"
                        label="Números"
                        checked={options.numbers}
                        onChange={handleChange} />
                    <Form.Check
                        type="checkbox"
                        id="specials"
                        label="Caracteres especiais"
                        checked={options.specials}
                        onChange={handleChange} />
                    <Button type="button" variant="primary" onClick={generateKey}>
                        Gerar Chave
                    </Button>
                    <Button type="button" variant="warning" className="ms-2" onClick={handleClear}>
                        Limpar
                    </Button>
                </div>
                <div className="col-md-6">
                    <h5 className="mt-4">Chave Gerada:</h5>
                    <p className="custom-bg form-control">{key}</p> {/* Mantendo o estilo do parágrafo */}
                    <h5 className="mt-4">Contar tamanho de uma Chave:</h5>
                    <Form.Control
                        type="text"
                        placeholder="Digite sua chave aqui"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)} />
                    <p className="mt-2">Comprimento da Chave Inserida: {inputKey.length}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
