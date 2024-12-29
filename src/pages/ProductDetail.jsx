import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Impor useNavigate
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Header from "../components/Header";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Menambahkan state quantity
  const { id } = useParams(); // Mendapatkan id produk dari URL
  const navigate = useNavigate(); // Gunakan useNavigate
  const dispatch = useDispatch();

  useEffect(() => {
    // Mendapatkan detail produk berdasarkan ID
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}products/${id}`
        );
        setProduct(response.data); // Simpan data produk
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("userToken");
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login"); // Redirect ke halaman login jika belum login
    } else {
      // Menambahkan produk ke cart beserta quantity
      dispatch(addToCart({ ...product, quantity }));
      alert(`${product.title} has been added to the cart!`);
    }
  };

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        {product ? (
          <div className="product-detail">
            <h1>{product.title}</h1>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
              />
            </div>
            <button className="btn add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
