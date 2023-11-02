import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Tab from './Tab1.jsx'; // Correct the file name
import Box from './Box.jsx'; // Correct the file name
import { Grid, Paper } from '@mui/material';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<Grid container style={{ height: '100vh' }}>
      <Grid item xs={12}>
        {/* Row 1: Height is determined by content */}
        <Paper style={{ height: '50px' }}>
          {/* Content for row 1 */}
          Account 
        </Paper>
      </Grid>

      <Grid item xs={8}>
        {/* Row 2: Height is determined by content */}
        <Paper style={{ height: '200px' }}>
          Timer
        </Paper>
      </Grid>

      <Grid item xs={12}>
        {/* Row 2: Height is determined by content */}
        <Paper style={{ height: '200px' }}>
          <App />
        </Paper>
      </Grid>





    </Grid>



  </React.StrictMode>
);
