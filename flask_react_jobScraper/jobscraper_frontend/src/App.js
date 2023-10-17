import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Switch, BrowserRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CustomNavbar from './Navbar'; 
import SearchPage from './SearchBar';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api')
            .then(response => {
                console.log(response.data); 
                setMessage(response.data.message);
            });
    }, []);

    return (
        <Router>
        <div className="App">
            <CustomNavbar/>
            <Container>
                <header className="App-header">
                 <p>{message}</p>
                </header>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={SearchPage} />
                </Switch>
            </Container>
        </div>
        </Router>
    );
}

export default App;
