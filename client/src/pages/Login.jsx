import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/login.css";
import { loginUser } from "../services/authService";

const loginHeroImg = "/login-hero.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const data = await loginUser(formData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

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

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="email">Enter your email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Enter your password</label>

                <div className="login-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="atleast 8 characters"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
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

              {error && (
                <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>
              )}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
              </button>

              <p className="register-text">
                Don&apos;t have an account? <Link to="/register">Register</Link>
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
