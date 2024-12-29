import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CartPage from "./pages/Cart";
import HeaderPage from "./components/Header";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/header" element={<HeaderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
