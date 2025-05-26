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
import ShopGrid from "./Pages/ShopGrid/Index.jsx";
import Wishlist from "./Pages/Wishlist/Index.jsx";
import Login from "./Pages/LogIn/Index.jsx";
import Sign from "./Pages/SignUp/Index.jsx";
import Verify from "./Pages/SignUp/Verify.jsx";
import Brands from "./Pages/Brands/index.jsx";
import ForgetPass from "./Pages/LogIn/ForgetPass.jsx";
import ResetPassword from "./Pages/LogIn/ResetPassword.jsx";
import ScrollToTop from "./Components/common/ScrollToTop.jsx";
import Category from "./Pages/ShopGrid/Category.jsx";
import Payment from "./Pages/CheckOut/Payment.jsx";
import { AuthProvider } from "./Context/AuthContext.js";
function App() {
  let routes = (
    <Router>
      <ScrollToTop />
      <div className="App">
        <TopHeader />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUsPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/CMS" element={<Cms />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/ContactUs" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/MYAccount" element={<Account />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Product/:url_key" element={<Product />} />
          <Route path="/ShopGrid" element={<ShopGrid />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/SignUp" element={<Sign />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/Brands" element={<Brands />} />
          <Route path="/ForgetPass" element={<ForgetPass />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/Payment" element={<Payment />} />
        </Routes>

        <Footer />
        <ScrollTop />
      </div>
    </Router>
  );

  return <AuthProvider>{routes}</AuthProvider>;
}

export default App;
