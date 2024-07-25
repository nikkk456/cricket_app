import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
