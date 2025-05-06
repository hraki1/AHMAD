import { Home } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileNav = ({ isMenuOpen, toggleMenu }) => {
  const [dropdowns, setDropdowns] = useState({
    home: false,
    homeSub: false,
    shop: false,
    blog: false,
    pages: false,
  });

  const toggleDropdown = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      className={`mobile-nav-wrapper ${isMenuOpen ? "active" : ""}`}
      role="navigation"
    >
      <div className="closemobileMenu" onClick={toggleMenu}>
        <i className="fas fa-times"></i>
      </div>

      <ul id="MobileNav" className="mobile-nav">
        {/* HOME */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            Home{" "}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("home", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.home && (
            <ul className="lvl-2 d-block" id="home-dropdown">
              <li>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/" className="site-nav">
                    Home
                  </Link>
                  <i
                    className="icon fa-solid fa-bars"
                    onClick={(e) => toggleDropdown("homeSub", e)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>

                {dropdowns.homeSub && (
                  <ul className="lvl-3 d-block" id="home-sub-dropdown">
                    <li>
                      <Link to="/" className="site-nav">
                        Home 1
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* SHOP */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            Shop{" "}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("shop", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.shop && (
            <ul className="lvl-2 d-block" id="shop-dropdown">
              <li>
                <Link to="/Collection" className="site-nav">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/ShopGrid" className="site-nav">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/Wishlist" className="site-nav">
                  Wishlist
                </Link>
              </li>
              <li></li>
            </ul>
          )}
        </li>

        {/* Pages */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            Pages{" "}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("pages", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.pages && (
            <ul className="lvl-2 d-block" id="pages-dropdown">
              <li>
                <Link to="/AboutUs" className="site-nav">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="site-nav">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/MYAccount" className="site-nav">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/Portfolio" className="site-nav">
                  Portfolio Page
                </Link>
              </li>
              <li>
                <Link to="/faq" className="site-nav">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/CMS" className="site-nav">
                  CMS Page
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Blog */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            Blog{" "}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("blog", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.blog && (
            <ul className="lvl-2 d-block" id="blog-dropdown">
              <li>
                <Link to="/ShopGrid" className="site-nav">
                  ShopGrid
                </Link>
              </li>
              <li>
                <Link to="/Product" className="site-nav">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/Collection" className="site-nav">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/Wishlist" className="site-nav">
                  Wishlist
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Bottom Section */}
        <li className="mobile-menu-bottom">
          <div className="mobile-links">
            <ul className="list-inline d-inline-flex flex-column w-100">
              <li className="mb-3 pt-1 mt-3">
                <Link to="/LogIn" className="d-flex align-items-center">
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Sign In
                </Link>
              </li>
              <li className="mb-3 pt-1">
                <Link to="/SignUp" className="d-flex align-items-center">
                  <i className="fa-solid fa-user me-1"></i> Register
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/MYAccount" className="d-flex align-items-center">
                  <i className="fa-solid fa-address-card me-1"></i> My Account
                </Link>
              </li>
              <li className="Main-title-mobile">Need Help?</li>
              <li className="mb-3 pt-1">
                <a
                  href="tel:401234567890"
                  className="d-flex align-items-center"
                >
                  <i className="fa-solid fa-phone me-1"></i> (+40) 123 456 7890
                </a>
              </li>
              <li className="mb-3 pt-1">
                <a
                  href="mailto:info@example.com"
                  className="d-flex align-items-center"
                >
                  <i className="fa-solid fa-envelope me-1"></i> info@example.com
                </a>
              </li>
            </ul>
          </div>
          <div className="mobile-follow mt-2">
            <div className="Main-title-mobile">Follow Us</div>
            <ul className="list-inline social-icons d-inline-flex mt-1">
              <li className="list-inline-item">
                <Link to="#" title="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="Twitter">
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="Pinterest">
                  <i className="fa-brands fa-pinterest-p"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="Linkedin">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="#" title="Youtube">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
