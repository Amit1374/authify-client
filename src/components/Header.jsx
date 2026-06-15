import React from 'react'
import { assets } from "../assets/assets.js";
import { AppContext } from '../context/AppContext.jsx';
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (isLoggedIn) {
      window.open(
        "https://amit-vishwakarma.vercel.app/",
        "_blank"
      );
    } else {
      navigate("/login");
    }
  };
  const handleViewSource = () => {
    window.open(
      "https://github.com/Amit1374/authify-server",
      "_blank"
    );
  };
  return (
    <div
      className="container-fluid px-4"
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Shapes */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(102,126,234,0.08)",
          top: "-100px",
          left: "-100px",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(118,75,162,0.08)",
          bottom: "-100px",
          right: "-100px",
          filter: "blur(40px)",
        }}
      />

      <div
        className="row align-items-center w-100"
        style={{ maxWidth: "1200px" }}
      >
        {/* IMAGE FIRST ON MOBILE */}
        <div className="col-lg-6 order-1 order-lg-2 text-center mb-4 mb-lg-0">
          <div
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              borderRadius: "30px",
              padding: "2rem",
              boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <img
              src={assets.header}
              alt="header"
              className="img-fluid"
              style={{
                maxWidth: "450px",
                width: "100%",
                maxHeight: "350px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* TEXT SECOND ON MOBILE */}
        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4"
            style={{
              borderRadius: "999px",
              background: "rgba(102,126,234,0.08)",
              border: "1px solid rgba(102,126,234,0.15)",
            }}
          >
            <span>🚀</span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#667eea",
              }}
            >
              Modern Authentication Platform
            </span>
          </div>

          <h5
            className="fw-semibold mb-3"
            style={{
              color: "#6c757d",
            }}
          >
            Welcome back, {userData ? userData.name : "Developer"} 👋
          </h5>

          <h1
            className="fw-bold mb-4"
            style={{
              fontSize: "clamp(2.3rem, 6vw, 4.8rem)",
              lineHeight: "1.1",
            }}
          >
            Secure Authentication
            <br />
            Made
            <span
              style={{
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {" "}
              Simple
            </span>
          </h1>

          <p
            className="mx-auto mx-lg-0"
            style={{
              maxWidth: "550px",
              color: "#6c757d",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            Complete authentication solution with email verification,
            password recovery, OTP validation and secure user management
            built for modern web applications.
          </p>

          <div
            className="d-flex flex-column flex-sm-row gap-3 mt-4 justify-content-center justify-content-lg-start"
          >
            <button
              className="btn px-4 py-3 fw-semibold"
              style={{
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg,#667eea,#764ba2)",
                color: "white",
                border: "none",
                minWidth: "180px",
                boxShadow:
                  "0 10px 25px rgba(102,126,234,0.3)",
              }}
              onClick={handleGetStarted}
            >
              Get Started
            </button>

            <button
              className="btn px-4 py-3 fw-semibold"
              onClick={handleViewSource}
              style={{
                borderRadius: "14px",
                border: "1px solid rgba(102,126,234,0.2)",
                background: "white",
                color: "#667eea",
              }}
            >
              View Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header

