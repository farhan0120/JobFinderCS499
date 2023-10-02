import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CustomNavbar from './Navbar'; 
import SearchPage from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api')
            .then(response => {
                setMessage(response.data.message);
            });
    }, []);

    return (
        <div className="App">
            <CustomNavbar/>
            <Container>
                <header className="App-header">
                 <p>{message}</p>
                </header>
                <SearchPage/>
            </Container>
        </div>
    );
}

export default App;
