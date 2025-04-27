import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopHeader from "./Components/layout/Header/TopHeader";
import Header from "./Components/layout/Header/Header";
import Footer from "./Components/layout/Footer/Footer";
import HomePage from "./Pages/Home";
import AboutUsPage from "./Pages/AboutUs/Index.jsx";
import CartPage from "./Pages/Cart/Index.jsx";
import CheckOut from "./Pages/CheckOut/Index.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="index.html" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/CheckOut" element={<CheckOut />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
