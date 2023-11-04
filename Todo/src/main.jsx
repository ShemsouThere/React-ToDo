import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Tab from './Tab1.jsx'; // Correct the file name
import Box from './Box.jsx'; // Correct the file name
import './index.css'
import { Grid, Paper } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<section>
        <div className="layout text-2xl text-white">
          <div className="content1 centered">
           Content1  
          </div>
          <div className="content2 centered">
            Content2  
          </div>
          <div className="content3 centered">
            Content3  
          </div>

          <div className="content4 centered">
            Content4  
          </div>
          <div className="content5 centered">
            Content5  
          </div>
          <div className="content6 centered">
            Content6  
          </div>

          <div className="content7 centered">
            Content7  
          </div>
          <div className="content8 centered">
            Content8  
          </div>
        </div>
      </section>

  </React.StrictMode>
);
