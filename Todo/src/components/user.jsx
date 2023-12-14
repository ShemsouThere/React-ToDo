// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import Cookies from 'js-cookie'; // Import the js-cookie library
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
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





export const Loginuser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState(null);
  
    useEffect(() => {
      const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
        
        document.getElementById("signInDiv").hidden = true;

        const url = 'http://localhost/todo/SignIn-Up.php';
        const sData = new FormData();
        sData.append('userMail', userObject.email); // Accessing 'mail' property from userObject
        sData.append('username', userObject.name); // assuming userObject contains 'username'
        sData.append('password', userObject.name); // assuming userObject contains 'password'
        sData.append('picture', userObject.picture); // assuming userObject contains 'password'
        dispatch({ type: 'SET_USER_MAIL', payload: userObject.email });
        console.log('Form Data:', {
          mail: userObject.email,
          name: userObject.name,
          picture: userObject.picture,
        });
      
      
        axios
        .post(url, sData)
        .then((response) => {
          const receivedUserID = response.data; // Assuming the userID is sent as a response from PHP
          console.log("Received userID:", receivedUserID);

          // Set the received userID in state
          setUserID(receivedUserID);
          dispatch({ type: 'SET_USER_ID', payload: userID });
        })
        .catch((error) => alert(error));
      
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
    }, [dispatch, userID]);
  //if we have no user: sign in button
 // if we have a user: show the log out button
 function handleSignOut() {
  setUser({});
  setUserID(null)
  dispatch({ type: 'SET_USER_ID', payload: userID });
  document.getElementById("signInDiv").hidden = false;
}
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
  const handleupdateuserid = () => {
    const userId = Cookies.get('userId');
    const [userID, setUserID] = useState(userID);
    setUserID(userID);
    dispatch({ type: 'SET_USER_ID', payload: userID });
  }

  return (
    
    <>
      <button onClick={handleToggle}>Login</button>
      <button onClick={handleupdateuserid}>updateuserid</button>
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
       <button onClick={ (e) => handleSignOut(e)}>Sign out</button>
      }

      <img src={user.picture}></img>
      <h2>👋HI {user.name}</h2>





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

export const Name = () => {
  const userObject = useSelector((state) => state.userObject);
  return <h2>{userObject}</h2>;
};
