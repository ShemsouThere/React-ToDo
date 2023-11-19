// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import './space.css';

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

export const CreateSpace = () => {
  const [spacename, setSpacename] = useState('');
  const [spaceid, setSpaceid] = useState('');
  const [userid, setUserid] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    const url = 'http://localhost/todo/createspace.php';
    const sData = new FormData();
    sData.append('spacename', spacename);
    sData.append('spaceid', spaceid);
    sData.append('userid', userid);
  
    // Log the form data before sending the request
    console.log('Form Data:', {
      spacename: spacename,
      spaceid: spaceid,
      userid: userid
    });
  
    axios.post(url, sData)
      .then(response => alert(response.data))
      .catch(error => alert(error));
  };
  

  return (
    <>
      <button onClick={handleToggle}>Create New Space</button>
      {isVisible && (
        <form className='create_space_form_container'>
          <div className='close-button' onClick={handleClose}>
            <CloseButton onClick={handleClose} />
          </div>
          <label htmlFor="spacename" className="cool-label">SpaceName</label>
          <input
            type="text"
            id="spacename"
            className="cool-input"
            value={spacename}
            onChange={(e) => setSpacename(e.target.value)}
          />
          <input
            type="text"
            id="spaceid"
            placeholder='Space Id'
            className="cool-input1"
            value={spaceid}
            onChange={(e) => setSpaceid(e.target.value)}
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

export const Spaces = () => {
  return (
    <div className='space'>
      <ul>
        <li>Space 1</li>
        <li>Space 2</li>
        <li>Space 3</li>
        <li>Space 4</li>
      </ul>
    </div>
  );
};
