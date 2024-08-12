import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/dashboard/Dashboard';
import ForgetPassword from './component/ForgetPassword';
import SetNewPassword from './component/SetNewPassword';
import PlayerProfile from './component/PlayerProfile';
import NotFound from './component/NotFound';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from './context/SocketContext';

function App() {
  const socket = useContext(SocketContext);
  console.log("This is socket", socket);
  useEffect(() => {
    if (!socket) {
      console.log("Socket is not initialised yet");
    } else {
      socket.on('receiveNotification', (data) => {
        alert(data.message); // Handle notification (e.g., show in UI)
      });
    }
  }, [socket]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/setnewpassword" element={<SetNewPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/playerprofile/:id/*" element={<PlayerProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
