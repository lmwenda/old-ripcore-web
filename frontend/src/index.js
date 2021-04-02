import React from 'react';
import dotenv from 'dotenv';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

// Configs

dotenv.config();

// Rendering React App 

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
