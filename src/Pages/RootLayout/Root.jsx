import { Outlet } from "react-router-dom";
import TopHeader from "../../Components/layout/Header/TopHeader";
import Header from ".../../Components/layout/Header/Header";
import Footer from "../../Components/layout/Footer/Footer";
import ScrollTop from "../../Components/layout/Footer/ScrollTop";

export default function Layout() {
  return (
    <>
      <TopHeader />
      <Header />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
}
