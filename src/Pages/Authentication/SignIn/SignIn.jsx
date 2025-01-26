import { useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { toast } from "react-toastify";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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

    if (!emailIsValid) {
      toast.error("Invalid email format.");
      return;
    }
    if (!passwordIsValid) {
      toast.error("Password must be between 8 and 20 characters.");
      return;
    }

    try {
      const payload = { email: form.email, password: form.password };
      const response = await axios.post(
        "http://localhost:4000/signin",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        cookies.set("authToken", token);
        navigate("/product", { replace: true });
      }
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={onHandleSubmit}>
        <h3>Sign In</h3>

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

        <button type="submit">Sign In</button>
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
          Don't have an accout?{" "}
          <span
            style={{ fontSize: "0.8rem", color: "#069159", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signin;
