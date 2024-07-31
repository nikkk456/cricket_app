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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/forgetpassword" element={<ForgetPassword/>}/>
        <Route path = "/setnewpassword" element={<SetNewPassword/>}/>
        <Route path = "/dashboard/*" element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
