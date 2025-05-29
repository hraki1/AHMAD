import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
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
import NotFound from "./Pages/NotFound/NotFound.jsx";
import { AuthContext } from "./Context/AuthContext.js";
import Spinner from "./Components/UI/SpinnerLoading.jsx";
import { ProtectedRoute } from "./Components/layout/ProtectedRoute.jsx";
import MinimalLayout from "./Components/layout/MinimalLayout.jsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
function App() {
  const { isLoading } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Router>
      <TopHeader />

          <Footer />
          <ScrollTop />
        </div>
      </Router>
    );
  } else if (!isAuthenticated && !isLoading) {
    routes = (
      <Router>
        <ScrollToTop />
        <div className="App">
          <TopHeader />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<AboutUsPage />} />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/CMS" element={<Cms />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/ContactUs" element={<Contact />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Portfolio" element={<Portfolio />} />
            <Route path="/Product/:url_key" element={<Product />} />
            <Route path="/ShopGrid" element={<ShopGrid />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/SignUp" element={<Sign />} />
            <Route path="/LogIn" element={<Login />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/ForgetPass" element={<ForgetPass />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <ScrollTop />
        </div>
      </Router>
    );
  }

      <Routes>
        <Route
          element={
            <div className={isRTL ? "app rtl" : "app ltr"}>
              <Header />
              <Outlet />
              <Footer />
              <ScrollTop />
            </div>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUsPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/CMS" element={<Cms />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/ContactUs" element={<Contact />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Product/:url_key" element={<Product />} />
          <Route path="/ShopGrid" element={<ShopGrid />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/SignUp" element={<Sign />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/Brands" element={<Brands />} />
          <Route path="/Verify" element={<Verify />} />
          <Route
            path="/CheckOut"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MYAccount"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="/ForgetPass" element={<ForgetPass />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
