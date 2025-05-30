import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import TopHeader from "../../Components/layout/Header/TopHeader";
import Header from "../../Components/layout/Header/Header";
import Footer from "../../Components/layout/Footer/Footer";
import ScrollTop from "../../Components/layout/Footer/ScrollTop";
import { useTranslation } from "react-i18next";

const Root = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const googleLoginToken = searchParams.get("token");

    if (googleLoginToken) {
      console.log("Google Token:", googleLoginToken);
      localStorage.setItem("token", googleLoginToken);
    }

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL, searchParams]);

  return (
    <div className={isRTL ? "app rtl" : "app ltr"}>
      <TopHeader />
      <Header />
      <Outlet />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Root;
