import React from 'react'
import './App.css'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import MenuBar from './components/MenuBar'
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing ToastContainer from react-toastify for notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/menu-bar" element={<MenuBar />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      
    </div>
  )
}

export default App

