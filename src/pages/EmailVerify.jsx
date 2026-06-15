import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useContext, useRef, useState } from "react";
import { AppContext } from '../context/AppContext.jsx';
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value= value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();

  }

  const handleVerify = async() =>{
    const otp = inputRef.current.map(input => input.value).join("");
    if(otp.length !== 6){
      toast.error("Please enter a valid OTP");
      return;
    } 
    setLoading(true);
    try{
     const response = await axios.post(backendURL+ "/verify-otp", {otp});
     if(response.status === 200){
        toast.success("Email verified successfully!");
        getUserData();
        navigate("/");
      
        }else{
          toast.error("Invalid OTP, please try again");
        }
      }catch(error){
        toast.error("Failed to verify email, please try again");
    }finally{
      setLoading(false);
    }
  }
  return (
  <div
    className="min-vh-100 d-flex justify-content-center align-items-center position-relative px-3"
    style={{
      background:
        "linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)",
      overflow: "hidden",
    }}
  >
    {/* Background Blobs */}
    <div
      style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        top: "-150px",
        left: "-120px",
        filter: "blur(20px)",
      }}
    />

    <div
      style={{
        position: "absolute",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        bottom: "-150px",
        right: "-120px",
        filter: "blur(20px)",
      }}
    />

    {/* Logo */}
    <div
      style={{
        position: "absolute",
        top: "30px",
        left: "40px",
      }}
    >
      <Link
        to="/"
        className="text-decoration-none d-flex align-items-center"
      >
        <img
          src={assets.logo}
          alt="logo"
          width={60}
          height={60}
        />

        <span
          className="ms-2 fw-bold text-white"
          style={{
            fontSize: "1.7rem",
          }}
        >
          Authify
        </span>
      </Link>
    </div>

    {/* Card */}
    <div
      className="glass-card"
      style={{
        width: "100%",
        maxWidth: "480px",
      }}
    >
      <div className="text-center mb-4">
        <h2 className="fw-bold text-white">
          Verify Email
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            marginBottom: 0,
          }}
        >
          Enter the 6-digit verification code sent
          to your email address
        </p>
      </div>

      <div className="d-flex justify-content-center gap-2 mb-4">
        {[...Array(6)].map((_, i) => (
          <input
            key={`email-verify-email-${Math.random()}`}
            type="text"
            maxLength={1}
            className="otp-box"
            ref={(el) => (inputRef.current[i] = el)}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      <button
        className="btn verify-btn w-100 fw-bold"
        disabled={loading}
        onClick={handleVerify}
      >
        {loading
          ? "Verifying..."
          : "Verify Email"}
      </button>
    </div>

    <style>{`
      .glass-card {
        padding: 2.5rem;
        border-radius: 30px;
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid rgba(255,255,255,0.15);
        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
      }

      .otp-box {
        width: 55px;
        height: 55px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.08);
        color: white;
        text-align: center;
        font-size: 1.4rem;
        font-weight: 600;
        outline: none;
        transition: all 0.3s ease;
      }

      .otp-box:focus {
        border-color: rgba(255,255,255,0.5);
        background: rgba(255,255,255,0.12);
        box-shadow:
          0 0 0 4px rgba(255,255,255,0.08),
          0 0 20px rgba(255,255,255,0.15);
      }

      .verify-btn {
        height: 56px;
        border-radius: 14px !important;
        border: none !important;
        background: linear-gradient(
          135deg,
          #ffffff,
          #f1f4ff
        ) !important;
        color: #5b4df7 !important;
        font-weight: 700;
        transition: all 0.3s ease;
      }

      .verify-btn:hover:not(:disabled) {
        transform: translateY(-2px);
      }

      @media (max-width: 576px) {
        .glass-card {
          padding: 1.5rem;
        }

        .otp-box {
          width: 45px;
          height: 45px;
          font-size: 1.1rem;
        }
      }
    `}</style>
  </div>
);
}

export default EmailVerify

