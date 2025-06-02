import PageHeader from "../../Components/layout/Header/PageHeader";
import ProductDetail from "./ProductDetail";
import Product from "./Product";
import ProductSlider from "../../Components/ProductSlider";
import ScrollToTop from "../../Components/common/ScrollToTop";
import { useTranslation } from "react-i18next";
import ReviewSection from "./ReviewSection";
import { useParams } from "react-router-dom";

import useFetchOneProduct from "../Hooks/useFetchOneProduct";
import Spinner from "../../Components/UI/SpinnerLoading";
export default function Index() {
  const { t } = useTranslation();
  const { url_key } = useParams();
  const { product, loading, error } = useFetchOneProduct(url_key);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error">
        {t("An error occurred while fetching the product.")}
      </div>
    );
  }
  console.log(product.data[0]);

  return (
    <div>
      <ScrollToTop />
      <PageHeader title={product?.name || t("Product")} />
      {product ? (
        <ProductDetail product={product.data[0]} />
      ) : (
        <h1>Product no Found</h1>
      )}
      <Product />
      <div className="container">
        <ReviewSection />
      </div>
      <ProductSlider
        showTabs={false}
        subtitle={t("Weekly Deals")}
        title={t("Check out our newest discounts!")}
      />
    </div>
  );
}
