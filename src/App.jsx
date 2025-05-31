import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
import Category from "./Pages/ShopGrid/Category.jsx";
import Payment from "./Pages/CheckOut/Payment.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

import Spinner from "./Components/UI/SpinnerLoading.jsx";
import { AuthContext } from "./Context/AuthContext.jsx";
import { ProtectedRoute } from "./Components/layout/ProtectedRoute.jsx";
import MinimalLayout from "./Components/layout/MinimalLayout.jsx";
import Root from "./Pages/RootLayout/Root.jsx";
import PaymentSuccess from "./Pages/SuccessPayment/Successpayment.jsx";
import ErrorPage from "./Pages/ErrorPage/ErrorPage.jsx";

import SearchResults from "./Pages/SearchResults/Index.jsx";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/AboutUs", element: <AboutUsPage /> },
      { path: "/Cart", element: <CartPage /> },
      { path: "/CMS", element: <Cms /> },
      { path: "/Collection", element: <Collection /> },
      { path: "/ContactUs", element: <Contact /> },
      { path: "/FAQ", element: <FAQ /> },
      { path: "/Portfolio", element: <Portfolio /> },
      { path: "/Product/:url_key", element: <Product /> },
      { path: "/ShopGrid", element: <ShopGrid /> },
      { path: "search", element: <SearchResults /> },
      { path: "/Category", element: <Category /> },
      { path: "/Wishlist", element: <Wishlist /> },
      { path: "/SignUp", element: <Sign /> },
      { path: "/LogIn", element: <Login /> },
      { path: "/Brands", element: <Brands /> },
      { path: "/Verify", element: <Verify /> },
      {
        path: "/CheckOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cancel",
        element: (
          <ProtectedRoute>
            <h1>Canceled</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/MYAccount",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/success",
    element: <PaymentSuccess />,
  },
  {
    element: <MinimalLayout />,
    children: [
      { path: "/ForgetPass", element: <ForgetPass /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
    ],
  },
]);

const AppRouter = () => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) return <Spinner />;

  return <RouterProvider router={router} />;
};

export default AppRouter;
