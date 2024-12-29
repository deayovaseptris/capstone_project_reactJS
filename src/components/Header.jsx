import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Impor useNavigate
import "./Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigate

  useEffect(() => {
    // Memeriksa jika pengguna sudah login (dari localStorage)
    const storedUser = localStorage.getItem("userToken"); // Gunakan 'userToken' sebagai indikator login
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []); // Jalankan sekali saat komponen dimuat

  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data pengguna
    localStorage.removeItem("userToken"); // Hapus token
    alert("You have been logged out!");
    setIsLoggedIn(false); // Update status login di state
    navigate("/login"); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <nav className="bg-blue-600 fixed top-0 left-0 w-full shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* My E-Commerce di kiri */}
        <h1 className="text-white text-2xl font-bold">My E-Commerce</h1>

        {/* Home, Cart, Login, Logout di kanan */}
        <div className="flex space-x-4 mx-auto">
          <Link to="/" className="text-white nav-link">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/cart" className="text-white nav-link">
                Cart
              </Link>
              <button onClick={handleLogout} className="text-white nav-link">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
