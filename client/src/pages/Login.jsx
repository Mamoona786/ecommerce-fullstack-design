import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";

import loginHeroImg from "../assets/login-hero.png"; // save the attached image-right-side artwork as this file

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-card">
          <div className="login-left">
            <div className="login-brand">eCommerce Store</div>

            <div className="login-copy">
              <h1>Log in.</h1>
              <p>
                Log in with your data that you entered
                <br />
                during your registration.
              </p>
            </div>

            <form className="login-form">
              <div className="login-field">
                <label htmlFor="email">Enter your email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Enter your password</label>

                <div className="login-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="atleast 8 characters"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="forgot-wrap">
                <button type="button" className="forgot-link">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="login-btn">
                Log in
              </button>

              <p className="register-text">
                Don&apos;t have an account?{" "}
                <Link to="/register">Register</Link>
              </p>
            </form>
          </div>

          <div className="login-right">
            <div className="login-right-inner">
              <p className="welcome-small">Nice to see you again</p>
              <h2>Welcome back</h2>

              <div className="hero-bubbles">
                <span className="bubble bubble-1" />
                <span className="bubble bubble-2" />
                <span className="bubble bubble-3" />
                <span className="bubble bubble-4" />
                <span className="bubble bubble-5" />
                <span className="bubble bubble-6" />
                <span className="bubble bubble-7" />
                <span className="bubble bubble-8" />
                <span className="bubble bubble-9" />
              </div>

              <div className="hero-image-wrap">
                <img src={loginHeroImg} alt="Login visual" className="hero-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
