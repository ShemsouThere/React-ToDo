// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import Cookies from 'js-cookie'; // Import the js-cookie library
import jwt_decode from "jwt-decode";
import './user.css';





// eslint-disable-next-line react/prop-types
const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyles}>
      <IoClose style={iconStyles} />
    </button>
  );
};

const buttonStyles = {
  border: 'none',
  background: 'none',
  padding: 0,
  cursor: 'pointer',
};

const iconStyles = {
  width: '44px', // Adjust width as needed
  height: '44px', // Adjust height as needed
};

export const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userid, setUserid] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    const url = 'http://localhost/todo/createuser.php';
    const sData = new FormData();
    sData.append('username', username);
    sData.append('password', password);
    sData.append('userid', userid);
  
    // Log the form data before sending the request
    console.log('Form Data:', {
      username: username,
      password: password,
      userid: userid
    });
  
    axios.post(url, sData)
      .then(response => alert(response.data))
      .catch(error => alert(error));
  };
  

  return (
    <>
      <button onClick={handleToggle}>Create New User</button>
      {isVisible && (
        <form className='create_user_form_container'>
          <div className='close-button' onClick={handleClose}>
            <CloseButton onClick={handleClose} />
          </div>
          <label htmlFor="username" className="cool-label">UserName</label>
          <input
            type="text"
            id="username"
            className="cool-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            placeholder='Password'
            className="cool-input1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            id="userid"
            placeholder='User Id'
            className="cool-input1"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          <button className='create-button' onClick={handleSubmit}>Create</button>
        </form>
      )}
    </>
  );
};




export const Loginuser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
      };
    
      /*global google */
      google.accounts.id.initialize({
        client_id:"686018352391-stqd9b9o5mpgevcchdmfphd8hf9k6olg.apps.googleusercontent.com", // Replace with your client ID
        callback: handleCallbackResponse,
      });
    
      const options = {
        theme: "outline",
        size: "large",
        // Other options as needed
      };
    
      const signInDiv = document.getElementById("signInDiv"); // Replace with your element ID
      if (signInDiv) {
        google.accounts.id.renderButton(signInDiv, options);
      }
    }, []);


  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleLogin = () => {
    const loginData = new FormData();
    loginData.append('username', username);
    loginData.append('password', password);
    console.log('Form Data:', {
      username: username,
      password: password,
    });
  
    axios.post('http://localhost/todo/login.php', loginData)
      .then((response) => {
        console.log('Response:', response.data); // Log the entire response data
        const token = response.data.token;
  
        // Set the token in cookies
        Cookies.set('jwtToken', token, { expires: 7 }); // 'jwtToken' is the name of the cookie
        console.log('Token:', token); // Log the token to the console
        alert('Logged in successfully!');
        // Other actions after successful login
      })
      .catch((error) => {
        console.error('Login failed:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Error Response Data:', error.response.data);
          console.error('Error Response Status:', error.response.status);
          console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No Response Received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error Setting up Request:', error.message);
        } 
        alert('Login failed. Please try again.');
      });
  };
  
  // eslint-disable-next-line no-unused-vars
  const handleOLogin = () => {

  

  };


  return (
    
    <>
      <button onClick={handleToggle}>Login</button>
      <div id="signInDiv"></div>
      {isVisible && (
        <form className='create_user_form_container'>
          <div className='close-button' onClick={handleClose}>
          <CloseButton onClick={handleClose} />
          </div>
          <label htmlFor="username" className="cool-label">UserName - Password</label>
          <input
            type="text"
            name="username"
            className="cool-input"
            placeholder='USERNAME'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="cool-label">Password</label>
          <input
            type="password"
            name="password"
            className="password-input"
            placeholder='**********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login-button' onClick={handleLogin}>Login</button>
        </form>
        
      )}
    </>
  );

};

