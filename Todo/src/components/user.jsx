// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
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

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleLogin = () => {
    // Implement login functionality using axios or other methods
    // Example:
    const loginData = {
      username: username,
      password: password,
    };

    axios.post('http://localhost/todo/login.php', loginData)
      .then(() => {
        // Handle successful login
        alert('Logged in successfully!');
      })
      .catch(() => {
        // Handle login error
        alert('Login failed. Please try again.');
      });
  };

  return (
    <>
      <button onClick={handleToggle}>Login</button>
      {isVisible && (
        <form className='create_user_form_container'>
          <div className='close-button' onClick={handleClose}>
            <CloseButton onClick={handleClose} />
          </div>
          <label htmlFor="username" className="cool-label">UserName - Password</label>
          <input
            type="text"
            id="username"
            className="cool-input"
            placeholder='USERNAME'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="cool-label">Password</label>
          <input
            type="password"
            id="password"
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

