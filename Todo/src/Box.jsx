// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Tab.css'
// eslint-disable-next-line no-unused-vars
import { BiColor } from 'react-icons/bi';
// eslint-disable-next-line no-unused-vars
import { responsiveFontSizes } from '@mui/material';

export const Box = () => {

  return (
  
    <div className='box1'>
    <h2 color='white'>Box1</h2>
    </div>
  );
};

export const Box2 = () => {
  return (
    <div className='Box2 centered'>

      <h1>13:54</h1>

    </div>
  );
};

export const Box3 = (props) => {
  // eslint-disable-next-line react/prop-types
  const { myVar } = props; // Destructure the variable from props
  return (
    <div className='Box3'> {/* Updated class name */}
      { myVar } <br></br>
      <h2>Finished Tasks</h2>
    </div>
  );
};

