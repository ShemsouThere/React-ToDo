import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './App.jsx';
import Tab from './Tab1.jsx'; // Correct the file name
import { Box3 } from './Box.jsx'; // Correct the file name
import { Loginuser, Name} from './components/user.jsx';
import { CreateSpace } from './components/space.jsx';
import { Provider } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { useSelector } from 'react-redux';
import store from './store'; // Your Redux store
import PomodoroTimer from './pomodorotimer.jsx';

import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>

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
             <span></span>
             <Loginuser />
          </div>
          <div className="content6">
            <h2>👋 HI!</h2><Name />
          </div>

        </div>
      </section>


      </Provider>
  </React.StrictMode>
);
