import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './App.jsx';
import Tab from './Tab1.jsx'; // Correct the file name
import { Box, Box2, Box3 } from './Box.jsx'; // Correct the file name
import { CreateSpace, Spaces } from './components/space';
import PomodoroTimer from './pomodorotimer.jsx';

import './index.css'
import { Grid, Paper, colors } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


<section>

        <div className="container text-2xl text-white">
          <div className="content1 ">
          <Tab /> 
          </div>
          <div className="content2 centered">
              <PomodoroTimer />
          </div>
          <div className="content3 centered">
             <Box3 var={14}/>{'\n'}
             <Box3 var={14}/>{'\n'}
             <Box3 var={14}/>
          </div>

          <div className="content4 centered">
          <TodoList /> 
          </div>
          <div className="content5 centered">
             <CreateSpace />
          </div>
          <div className="content6">
            <h2>👋 HI! Shemsou </h2>
          </div>

        </div>
      </section>

  </React.StrictMode>
);
