// eslint-disable-next-line no-unused-vars
import React , {useEffect} from 'react'
import './Tab.css'
// eslint-disable-next-line no-unused-vars
import { BiColor } from 'react-icons/bi';
// eslint-disable-next-line no-unused-vars
import { responsiveFontSizes } from '@mui/material';
import { useSelector } from 'react-redux';
export const Box = () => {

  return (
  
    <div className='box1'>
    <h2 color='white'>Box1</h2>
    </div>
  );
};


export const Completedtasks = () => {
  const completedtasks = useSelector((state) => state.completedtasks);

  useEffect(() => {
    // Your useEffect logic here
    console.log(completedtasks);
  }, [completedtasks]); // Add completedtasks to the dependency array

  return (
    <div className='Box3'>
      {completedtasks} <br/>
      <h3>Completed Tasks</h3>
    </div>
  );
};
