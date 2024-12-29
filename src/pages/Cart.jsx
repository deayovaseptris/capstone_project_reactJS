import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  // Membaca data cart dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedCartItems = [
      JSON.parse(localStorage.getItem("cartItems") || "[]"),
    ];
    setCartItems(storedCartItems);

    console.log(storedCartItems);
  }, []);

  // Handle perubahan kuantitas item dalam cart
  const handleQuantityChange = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;

    if (quantity > updatedCartItems[index].stock) {
      setMessage("Quantity exceeds available stock.");
    } else {
      setMessage("");
    }

    setCartItems(updatedCartItems);

    // Simpan kembali cart yang sudah diperbarui ke localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // Handle proses checkout
  const handleCheckout = () => {
    const updatedItems = cartItems.map((item) => {
      if (item.quantity <= item.stock) {
        // Mengurangi stok lokal
        const updatedStock = item.stock - item.quantity;

        // Update stok di API
        axios
          .put(`${process.env.REACT_APP_API_BASE_URL}products/${item.id}`, {
            stock: updatedStock,
          })
          .then(() => {
            console.log(`Stock for ${item.title} updated to ${updatedStock}`);
          })
          .catch((error) => {
            console.error("Error updating stock", error);
          });

        return { ...item, stock: updatedStock };
      }
      return item;
    });

    // Hapus cart dari localStorage setelah checkout
    localStorage.removeItem("cartItems");
    setCartItems([]);
    alert("Checkout successful!");
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Anda belum memilih item</p>
      ) : (
        <div>
          <ul className="cart-items-list">
            {cartItems.map((item, index) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Stock: {item.stock}</p>
                  <div className="quantity-controls">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={item.stock}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    />
                  </div>
                  {message && <p className="error-message">{message}</p>}
                </div>
              </li>
            ))}
          </ul>

          <button className="btn checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
