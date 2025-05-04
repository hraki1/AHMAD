// File: Footer.jsx
import React, { useState } from "react";
import CollapsibleLinks from "./CollapsibleLinks";
import { Link } from "react-router-dom";

const Footer = () => {
  const [subscribe, setSubscribe] = useState("");
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
                    Sign Up Our Newsletter &amp; Get 10% OFF
                  </div>
                  <div className="main-title-2">
                    Sign up to stay in the loop. Receive updates, access to
                    exclusive deals, and more.
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control newsletter-input"
                      name="email"
                      placeholder="Enter your email address..."
                      value={subscribe}
                      onChange={(e) => setSubscribe(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary newsletter-submit"
                      name="commit"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ===== Footer Top ===== */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3">
                <CollapsibleLinks title="Informations">
                  <li>
                    <Link to="/MYAccount">My Account</Link>
                  </li>
                  <li>
                    <Link to="/AboutUs">About us</Link>
                  </li>
                  <li>
                    <Link to="/LogIn">Login</Link>
                  </li>
                  <li>
                    <Link to="/SignUp">SignUp</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3">
                <CollapsibleLinks title="Quick Shop">
                  <li>
                    <Link to="/Collection">Collection</Link>
                  </li>
                  <li>
                    <Link to="/ShopGrid">ShopGrid</Link>
                  </li>
                  <li>
                    <Link to="/Product">Product</Link>
                  </li>
                  <li>
                    <Link to="/Wishlist">Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/CheckOut">CheckOut</Link>
                  </li>
                  <li>
                    <Link to="/Cart">Cart</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3">
                <CollapsibleLinks title="Customer Services">
                  <li>
                    <Link to="/CMS">CMS</Link>
                  </li>
                  <li>
                    <Link to="/FAQ">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/MYAccount">MYAccount</Link>
                  </li>
                  <li>
                    <Link to="/ContactUs">ContactUs</Link>
                  </li>
                </CollapsibleLinks>
              </div>

              <div className="col-12 col-md-3 footer-contact">
                <h4 className="h4 mb-3">Contact Us</h4>

                <p className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-location-dot me-2 pt-1" />
                  55 Amman Khalda, 2568 street, 23568 JO
                </p>

                <p className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-phone me-2" />
                  <a href="tel:401234567890">(+40) 123 456 7890</a>
                </p>

                <p className="d-flex align-items-center">
                  <i className="fa-solid fa-envelope me-2" />
                  <a href="mailto:info@example.com">info@example.com</a>
                </p>

                <ul className="list-inline social-icons mt-3">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-pinterest-p" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
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
              <div className="copytext">
                &copy; 2024 Hema. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
