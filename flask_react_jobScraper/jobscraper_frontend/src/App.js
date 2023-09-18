import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:5000/api')
            .then(response => {
                setMessage(response.data.message);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{message}</p>
            </header>
        </div>
    );
}

export default App;
