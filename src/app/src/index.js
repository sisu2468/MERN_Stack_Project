import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import NavigationContextProvider from 'contexts/NavigationContext';
import SessionContextProvider from 'contexts/SessionContext';

require("@south-paw/typeface-vag-rounded");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <SessionContextProvider>
    <NavigationContextProvider>
      <App />
    </NavigationContextProvider>
  </SessionContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
