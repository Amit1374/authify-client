import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendURL, setIsLoggedIn, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreateAccount) {
        const response = await axios.post(
          `${backendURL}/register`,
          {
            name,
            email,
            password,
          }
        );

        if (response.status === 201) {
          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error("Email already exists");
        }
      } else {
        const response = await axios.post(
          `${backendURL}/login`,
          { email, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          localStorage.setItem(
            "token",
            response.data.token
          );

          setIsLoggedIn(true);
          await getUserData();

          toast.success("Login successful!");
          navigate("/");
        }
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center position-relative px-3"
      style={{
        background:
          "linear-gradient(135deg,#667eea 0%,#764ba2 50%,#6B73FF 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Circles */}
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
              letterSpacing: "0.5px",
            }}
          >
            Authify
          </span>
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "470px",
          borderRadius: "30px",
          padding: "2.5rem",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white">
            {isCreateAccount
              ? "Create Account"
              : "Welcome Back"}
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              marginBottom: 0,
            }}
          >
            {isCreateAccount
              ? "Create your account and get started"
              : "Sign in to continue to your account"}
          </p>
        </div>

        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3 position-relative">
              <FaUser className="input-icon" />

              <input
                type="text"
                className="form-control modern-input"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>
          )}

          <div className="mb-3 position-relative">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              className="form-control modern-input"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="mb-3 position-relative">
            <FaLock className="input-icon" />

            <input
              type={
                showPassword ? "text" : "password"
              }
              className="form-control modern-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <span
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          <div className="text-end mb-4">
            <Link
              to="/reset-password"
              className="text-decoration-none"
              style={{
                color:
                  "rgba(255,255,255,0.85)",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 fw-bold login-btn"
          >
            {loading
              ? "Loading..."
              : isCreateAccount
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p
            style={{
              color:
                "rgba(255,255,255,0.85)",
              marginBottom: 0,
            }}
          >
            {isCreateAccount ? (
              <>
                Already have an account?{" "}
                <span
                  className="switch-link"
                  onClick={() =>
                    setIsCreateAccount(false)
                  }
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="switch-link"
                  onClick={() =>
                    setIsCreateAccount(true)
                  }
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      <style>{`
        .modern-input {
          height: 56px;
          border-radius: 14px !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          background: rgba(255,255,255,0.08) !important;
          color: white !important;
          padding-left: 48px !important;
          padding-right: 48px !important;
          transition: all 0.3s ease;
        }

        .modern-input::placeholder {
          color: rgba(255,255,255,0.65);
        }

        .modern-input:focus {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.5) !important;
          box-shadow:
            0 0 0 4px rgba(255,255,255,0.08),
            0 0 20px rgba(255,255,255,0.15) !important;
        }

        .input-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #d8d8ff;
          z-index: 10;
        }

        .password-toggle {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #d8d8ff;
          cursor: pointer;
          z-index: 10;
        }

        .login-btn {
          height: 56px;
          border-radius: 14px !important;
          border: none !important;
          background: linear-gradient(
            135deg,
            #ffffff,
            #f1f4ff
          ) !important;
          color: #5b4df7 !important;
          letter-spacing: 0.5px;
          box-shadow:
            0 10px 25px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
        }

        .switch-link {
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Login;