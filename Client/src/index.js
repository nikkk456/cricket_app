import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Cookies from 'js-cookie'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { PlayerProfileProvider } from './context/PlayerProfileContext';
import { SocketProvider } from './context/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const user_id = Cookies.get('user_id');
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <PlayerProfileProvider>
      <SocketProvider userId= {user_id}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </SocketProvider>
    </PlayerProfileProvider>
  </AuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
