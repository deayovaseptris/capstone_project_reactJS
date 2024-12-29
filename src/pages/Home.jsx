import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import Header from "../components/Header";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}products`;

    axios
      .get(apiUrl)
      .then((response) => {
        const productsWithQuantity = response.data.map((product) => ({
          ...product,
          quantity: 20,
        }));
        dispatch(setProducts(productsWithQuantity)); // Simpan ke Redux Store
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("userToken"); // Pastikan kunci ini sama
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login"); // Redirect ke halaman login
    } else {
      dispatch(addToCart(product)); // Tambahkan produk ke cart
      localStorage.setItem("cartItems", JSON.stringify(product));
      alert(`${product.title} has been added to the cart!`);
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`); // Navigasi ke halaman detail produk
  };

  return (
    <div>
      <Header />
      <div className="products-container">
        <h1>Products</h1>
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-card">
                <h3>{product.title}</h3>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <p className="product-price">${product.price}</p>
                <div className="product-buttons">
                  <button
                    className="btn add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn details"
                    onClick={() => handleViewDetails(product.id)} // Panggil fungsi untuk melihat detail produk
                  >
                    Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
