import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopHeader from "./Components/layout/Header/TopHeader";
import Header from "./Components/layout/Header/Header";
import Footer from "./Components/layout/Footer/Footer";
import ScrollTop from "./Components/layout/Footer/ScrollTop.jsx";
import HomePage from "./Pages/Home";
import AboutUsPage from "./Pages/AboutUs/Index.jsx";
import CartPage from "./Pages/Cart/Index.jsx";
import CheckOut from "./Pages/CheckOut/Index.jsx";
import Cms from "./Pages/Cms/Index.jsx";
import Collection from "./Pages/Collection-Style/Index.jsx";
import Contact from "./Pages/Contact/Index.jsx";
import FAQ from "./Pages/Faqs/Index.jsx";
import Account from "./Pages/Account/Index.jsx";
import Portfolio from "./Pages/Portfolio/Index.jsx";
import Product from "./Pages/Product/Index.jsx";

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
          <Route path="/Cms" element={<Cms />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Product" element={<Product />} />
        </Routes>
        <ScrollTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
