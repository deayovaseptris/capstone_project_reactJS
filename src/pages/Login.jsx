import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}users`;

    axios
      .get(apiUrl)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Mencari pengguna berdasarkan email dan password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Simpan token ke localStorage untuk menandai login
      const userToken = `${user.id}-${new Date().getTime()}`; // Token sederhana
      localStorage.setItem("userToken", userToken);

      alert("Login berhasil!");
      navigate("/"); // Redirect ke halaman home
    } else {
      setError("Email atau Password salah");
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <h2>Login berhasil!</h2>
        <p>Selamat datang, {email}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
