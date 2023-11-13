import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './Style.css';


function Registration()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let [error, setError] = useState('');
    const history = useHistory();
    const apiUrl = 'http://127.0.0.1:5000';
    async function checkLogin(){
        let response = await fetch(`${apiUrl}/getUser/${username}/${password}`)
        let responseJson = await response.json().catch(error => {
            setError('wrong username and password');
            console.log(error)
        });
        if(responseJson){
            localStorage.setItem("username", username);
            history.push('')
        }
    }
    const handleLogin= (event)=>
    {
        event.preventDefault();  
        if(username === '' && password === '')
        {
            setError('Error: Username and Password cannot be empty'); // set error message
            return;
        }else if(username === ''){
            setError('Error: Username cannot be empty'); // set error message
            return;
        }else if(password === ''){
            setError('Error: Password cannot be empty'); // set error message
            return;
        }
        checkLogin();
  
    }
 
    async function handleSignUp(event){
        event.preventDefault();
        
        //clear any previous error messages
        setError('');


        //validate input fields
        if(username === '' && password === '')
        {
            setError('Error: Username and Password cannot be empty'); // set error message
            return;
        }else if(username === ''){
            setError('Error: Username cannot be empty'); // set error message
            return;
        }else if(password === ''){
            setError('Error: Password cannot be empty'); // set error message
            return;
        }
        //check if the username already exists
        try {
            const response = await fetch(`${apiUrl}/findUser/${username}`);
            const data = await response.json();


            if (data.error) {
            //if the username is not found, proceed with registration
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password }),
            };

        const registrationResponse = await fetch(`${apiUrl}/makeNewUser`, request);
        if (registrationResponse.ok) {
            //registration was successful
            localStorage.setItem("username", username);
            history.push('/');
        } else {
            setError('an error occurred during registration');
        }
        } else {
        setError('Username already in use');
        }
        }catch (error){
            setError('an error occurred during registration');
            console.error(error);
        }
    }


    return (
    <div className="Login">
    <font id ="loginTitle"><h1 >Sign In</h1></font>
    <form id ="loginBox">
        {error && <p className="error">{error}</p>}
        {/* show error message if there is an error */}
        <label>
        Username:
        <input
            type="text"
            value={username}
            onChange={event => setUsername(event.target.value)}
        />
        </label>
        <label>
        Password:
        <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
        />
        </label>
        <button onClick = {handleLogin} type="submit">Login</button>
        <button onClick = {handleSignUp} type="submit">Sign Up</button>
    </form>
    </div>
    );
    }


export default Registration;
