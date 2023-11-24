// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Tab.css';
import { DiAptana } from 'react-icons/di';
import { BiAddToQueue } from 'react-icons/bi';
import { BiSquareRounded } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import { useDispatch } from 'react-redux';


const Tab = () => {
  const [expanded, setExpanded] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const dispatch = useDispatch();
  // Fetch spaces from PHP backend
  useEffect(() => {
    // Fetch spaces from PHP API endpoint using Axios
    axios.get('http://localhost/todo/fetchtabspace.php')
      .then((response) => {
        setSpaces(response.data); // Assuming data is an array of objects with space_id and space_name
      })
      .catch((error) => {
        console.error('Error fetching spaces:', error);
      });
  }, []);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSpaceClick = (space) => {
    // Navigate to main.jsx with space information
    // You can use React Router or similar for navigation
    // For example:
    // history.push(`/main?spaceid=${space.space_id}&spacename=${space.space_name}&userid=${space.user_id}`);
    dispatch({ type: 'SET_SPACE_ID', payload: space.space_id });
    console.log('Clicked space:', space);
  };

  return (
    
    <div className='box'>
      <ul className='centered-list' style={{ listStyleType: 'none' }}>
        <li>
          <a onClick={handleExpand}>
            <BiSquareRounded size={55} color='white' />
          </a>
          {expanded && (
            <ul className='centered-list-space' style={{ listStyleType: 'none' }}>
              {spaces.map((space) => (
                <li key={space.space_id}>
                  <a
                    href='#'
                    onMouseOver={() => setSelectedSpace(space)}
                    onMouseOut={() => setSelectedSpace(null)}
                    onClick={() => handleSpaceClick(space)}
                  >
                    <BiSquareRounded size={45} color='white' />
                    {selectedSpace === space && <span>{space.space_name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a href='link2'>
            <AiOutlineCalendar size={55} color='white' />
          </a>
        </li>
        <li>
          <a href='link3'>
            <BiAddToQueue size={55} color='white' />
          </a>
        </li>
        <li>
          <a href='./settings.html'>
            <DiAptana size={55} color='white' />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
