import React, { useState } from "react";
import CollapsibleLinks from "./CollapsibleLinks";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [subscribe, setSubscribe] = useState("");
  const { t } = useTranslation();

  function subscribes(e) {
    e.preventDefault();
    console.log("Subscribed with email: ", subscribe);
  }

  return (
    <>
      <div className="footer">
        <div className="newsletterbg clearfix">
          <div className="container">
            <form
              onSubmit={subscribes}
              action="#"
              method="post"
              className="footer-newsletter"
            >
              <div className="row align-items-center">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <div className="main-italic mb-1">
                    {t("Newsletter_Title")}
                  </div>
                  <div className="main-title-2">{t("Newsletter_Subtitle")}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control newsletter-input"
                      name="email"
                      placeholder={t("Enter_email")}
                      value={subscribe}
                      onChange={(e) => setSubscribe(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary newsletter-submit"
                      name="commit"
                    >
                      {t("Subscribe")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <CollapsibleLinks title={t("Informations")}>
                  <li>
                    <Link to="/MYAccount">{t("My_Account")}</Link>
                  </li>
                  <li>
                    <Link to="/AboutUs">{t("About_us")}</Link>
                  </li>
                  <li>
                    <Link to="/LogIn">{t("Login")}</Link>
                  </li>
                  <li>
                    <Link to="/SignUp">{t("SignUp")}</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3">
                <CollapsibleLinks title={t("Quick_Shop")}>
                  <li>
                    <Link to="/Collection">{t("Collection")}</Link>
                  </li>
                  <li>
                    <Link to="/ShopGrid">{t("ShopGrid")}</Link>
                  </li>
                  <li>
                    <Link to="/Product">{t("Product")}</Link>
                  </li>
                  <li>
                    <Link to="/Wishlist">{t("Wishlist")}</Link>
                  </li>
                  <li>
                    <Link to="/CheckOut">{t("CheckOut")}</Link>
                  </li>
                  <li>
                    <Link to="/Cart">{t("Cart")}</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3">
                <CollapsibleLinks title={t("Customer_Services")}>
                  <li>
                    <Link to="/CMS">{t("CMS")}</Link>
                  </li>
                  <li>
                    <Link to="/FAQ">{t("FAQ")}</Link>
                  </li>
                  <li>
                    <Link to="/MYAccount">{t("My_Account")}</Link>
                  </li>
                  <li>
                    <Link to="/ContactUs">{t("ContactUs")}</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3 footer-contact">
                <h4 className="h4 mb-3">{t("Contact_Us")}</h4>
                <p className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-location-dot me-2 pt-1" />
                  {t("Address")}
                </p>
                <p className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-phone me-2" />
                  <a href="tel:401234567890">{t("Phone")}</a>
                </p>
                <p className="d-flex align-items-center">
                  <i className="fa-solid fa-envelope me-2" />
                  <a href="mailto:info@example.com">info@example.com</a>
                </p>
                <ul className="list-inline social-icons mt-3">
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-pinterest-p" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-instagram" />
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#">
                      <i className="fab fa-youtube" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="d-flex-center flex-column flex-md-row-reverse justify-content-md-between">
              <ul className="payment-icons d-flex-center mb-2 mb-md-0">
                <li>
                  <i className="fa-brands fa-cc-visa fa-2xl me-2" />
                </li>
                <li>
                  <i className="fa-brands fa-cc-mastercard fa-2xl me-2" />
                </li>
                <li>
                  <i className="fa-brands fa-cc-paypal fa-2xl me-2" />
                </li>
              </ul>
              <div className="copytext">{t("Footer_Copyright")}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
