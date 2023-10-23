/* global gapi */
import React, { useEffect, useRef } from 'react';
import './Style.css';

function Login() {
  const googleSignInRef = useRef(null);

  useEffect(() => {
    // Initialize the Google API Client
    gapi.load('auth2', function () {
      window.gapi.auth2.init({
        client_id: '827984610566-2eb7npb5rmqd0ii07f8sl8u271eme8s4.apps.googleusercontent.com',
        plugin_name:'Job Finder Client'
      });
    });

    // Attach the Google Sign-In to the ref element
    gapi.load('signin2', function () {
      gapi.signin2.render('google-signin-button', {
        'onsuccess': onSignIn,
      });
    });
  }, []);

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    // You can perform actions like sending this data to your server if needed.
  }

  function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out');
    });
  }

  return (
    <div className="login-box">
      <h1>Google Sign-In</h1>
      <div
        ref={googleSignInRef}
        id="google-signin-button"
        style={{ display: 'inline-block' }}
      />
      <br />
      <button className="sign-out-button" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Login;
