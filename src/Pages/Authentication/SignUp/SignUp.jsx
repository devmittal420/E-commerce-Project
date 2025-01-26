import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onHandleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) =>
    password.length >= 8 && password.length <= 20;

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const emailIsValid = validateEmail(form.email);
    const passwordIsValid = validatePassword(form.password);
    const confirmPasswordIsValid = form.password === form.confirmPassword;

    if (!emailIsValid) {
      toast.error("Invalid email format.");
      return;
    }
    if (!passwordIsValid) {
      toast.error("Password must be between 8 and 20 characters.");
      return;
    }
    if (!confirmPasswordIsValid) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/signup", {
        email: form.email,
        password: form.password,
      });
      navigate("/signin", { replace: true });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onHandleSubmit}>
        <h3>Create Account</h3>
        <div
          className="input-group"
          style={{ width: "80%", margin: "30px auto" }}
        >
          <label
            htmlFor="email"
            style={{
              marginTop: "20px",
              textAlign: "start",
              color: "#585757",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={onHandleForm}
            required
          />
        </div>

        <div
          className="input-group"
          style={{ width: "80%", margin: "30px auto" }}
        >
          <label
            htmlFor="password"
            style={{
              marginTop: "20px",
              textAlign: "start",
              color: "#585757",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={onHandleForm}
            required
          />
        </div>

        <div
          className="input-group"
          style={{ width: "80%", margin: "30px auto" }}
        >
          <label
            htmlFor="confirmPassword"
            style={{
              marginTop: "20px",
              textAlign: "start",
              color: "#585757",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={form.confirmPassword}
            onChange={onHandleForm}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <p
          className=""
          style={{
            marginTop: "20px",
            textAlign: "end",
            color: "#6f6d6d",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          Already have an accout?{" "}
          <span
            style={{ fontSize: "0.8rem", color: "#069159", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            Signin
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
