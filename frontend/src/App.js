import React from 'react';  
import KeyGenerator from './components/KeyGenerator';  

const App = () => {  
    return (  
        <div className="App">  
            <h1>Gerador de JWT</h1>  
            <KeyGenerator />  
        </div>  
    );  
};  

export default App;