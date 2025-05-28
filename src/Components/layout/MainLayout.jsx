// Components/layout/MainLayout.jsx
import React from "react";
import TopHeader from "./Header/TopHeader";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollTop from "./Footer/ScrollTop";

const MainLayout = ({ children }) => {
  return (
    <>
      <TopHeader />
      <Header />
      {children}
      <Footer />
      <ScrollTop />
    </>
  );
};

export default MainLayout;
