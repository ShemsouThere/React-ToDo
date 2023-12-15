import { useState, useEffect } from 'react';
import './Tab.css';
import { DiAptana } from 'react-icons/di';
import { BiAddToQueue } from 'react-icons/bi';
import { BiSquareRounded } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
//-------spaces.jsx----------
import { IoClose } from 'react-icons/io5';
import './components/space.css';

const Tab = () => {
  const userID = useSelector((state) => state.userId); 
  const email = useSelector((state) => state.email);
  const [expanded, setExpanded] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchSpaces();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]); // Run fetchTodos whenever userId changes
  
  const fetchSpaces = () => {
    axios.get(`http://localhost/todo/fetchtabspace.php?email=${email}`)
      .then((response) => {
        setSpaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };
  
  
  

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
            <BiSquareRounded size={55} color='black' />
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
                    <BiSquareRounded size={45} color='black' />
                    {selectedSpace === space && <span>{space.space_name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a href='link2'>
            <AiOutlineCalendar size={55} color='black' />
          </a>
        </li>
        <li>
          <a href='link3'>
            <BiAddToQueue size={55} color='black' />
          </a>
        </li>
        <li>
          <a href='./settings.html'>
            <DiAptana size={55} color='black' />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
