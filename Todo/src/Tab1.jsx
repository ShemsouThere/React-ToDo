import React from 'react'
import './Tab.css'
import { DiAptana } from "react-icons/di";
import { BiAddToQueue } from "react-icons/bi";
import { BiSquareRounded } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

const Tab = () => {

  return (
  
    <div className='box'>
      <ul className='centered-list' style={{ listStyleType: 'none' }} >
      <li>
          <a href="link1">
            <BiSquareRounded size={55} color="white" />
          </a>
        </li>
        <li>
          <a href="link2">
            <AiOutlineCalendar size={55} color="white" />
          </a>
        </li>
        <li>
          <a href="link3">
            <BiAddToQueue size={55} color="white" />
          </a>
        </li>
        <li>
          <a href="./settings.html">
            <DiAptana size={55} color="white" />
          </a>
        </li>
      </ul>

    </div>
  );
};
const Box = () => {

  return (
  
    <div className='box1'>
    Box1
    </div>
  );
};

export default Tab; Box
