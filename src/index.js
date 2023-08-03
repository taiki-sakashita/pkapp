import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line no-unused-vars
import MediaQuery from 'react-responsive';
import App from './App';
import AppPhone from './App_phone'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <MediaQuery query="(max-width: 909px)">
    <React.StrictMode>
      <AppPhone />
    </React.StrictMode>
  </MediaQuery>
  <MediaQuery query="(min-width: 910px)">
      <App />
  </MediaQuery>
  </div>
);
