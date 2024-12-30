import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}products`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Tidak perlu menambahkan quantity di sini
        dispatch(setProducts(response.data)); // Simpan produk tanpa quantity
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem("userToken");
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login");
    } else {
      // Menambahkan produk dengan quantity 1
      dispatch(addToCart({ ...product, quantity: 1 }));
      alert(`${product.title} has been added to the cart!`);
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
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
                    onClick={() => handleViewDetails(product.id)}
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
