import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import ProductSlider from "../../Components/ProductSlider";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ScrollToTop from "../../Components/common/ScrollToTop";
import { useTranslation } from "react-i18next";
export default function Index() {
  const ctx = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div>
      <ScrollToTop />
      <PageHeader title={t(`Product`)} />
      <ProductDetail />
      <Product />
      <ProductSlider
        showTabs={false}
        subtitle="Weekly Deals"
        title="Check out our newest discounts!"
      />
    </div>
  );
}
