import React, { useState } from "react";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div
      className={`mobile-nav-wrapper ${isMenuOpen ? "open" : ""}`}
      role="navigation"
    >
      <div className="closemobileMenu" onClick={toggleMenu}>
        <i className="fas fa-times"></i>
      </div>
      <ul id="MobileNav" className="mobile-nav">
        <li className="lvl1 parent dropdown">
          <a href="index.html">
            Home <i className="icon anm anm-angle-down-l fa-solid fa-bars"></i>
          </a>
          <ul className="lvl-2">
            <li>
              <a href="index.html" className="site-nav">
                Fashion
              </a>
            </li>
            <li>
              <a href="index2-footwear.html" className="site-nav">
                Footwear
              </a>
            </li>
            <li>
              <a href="index4-electronic.html" className="site-nav">
                Electronic
              </a>
            </li>
          </ul>
        </li>
        <li className="lvl1 parent megamenu">
          <a href="#">
            Shop <i className="icon anm anm-angle-down-l fa-solid fa-bars"></i>
          </a>
          <ul className="lvl-2">
            <li>
              <a href="#;" className="site-nav">
                Collection Page <i className="icon anm anm-angle-down-l"></i>
              </a>
              <ul className="lvl-3">
                <li>
                  <a href="collection-style1.html" className="site-nav">
                    Collection style
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#;" className="site-nav">
                Shop Page{" "}
                <i className="icon anm anm-angle-down-l fa-solid fa-bars"></i>
              </a>
              <ul className="lvl-3">
                <li>
                  <a href="shop-grid-view.html" className="site-nav">
                    Shop Grid View
                  </a>
                </li>
                <li>
                  <a href="shop-list-view.html" className="site-nav">
                    Shop List View
                  </a>
                </li>
                <li>
                  <a href="shop-left-sidebar.html" className="site-nav">
                    Shop Left Sidebar
                  </a>
                </li>
                <li>
                  <a href="shop-right-sidebar.html" className="site-nav">
                    Shop Right Sidebar
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#;" className="site-nav">
                Shop Other Page <i className="icon anm anm-angle-down-l"></i>
              </a>
              <ul className="lvl-3">
                <li>
                  <a href="wishlist-style1.html" className="site-nav">
                    Wishlist Style1
                  </a>
                </li>
                <li>
                  <a href="wishlist-style2.html" className="site-nav">
                    Wishlist Style2
                  </a>
                </li>
                <li>
                  <a href="compare-style1.html" className="site-nav">
                    Compare Style1
                  </a>
                </li>
                <li>
                  <a href="compare-style2.html" className="site-nav">
                    Compare Style2
                  </a>
                </li>
                <li>
                  <a href="cart-style1.html" className="site-nav">
                    Cart Style1
                  </a>
                </li>
                <li>
                  <a href="cart-style2.html" className="site-nav">
                    Cart Style2
                  </a>
                </li>
                <li>
                  <a href="checkout-style1.html" className="site-nav">
                    Checkout Style1
                  </a>
                </li>
                <li>
                  <a href="checkout-style2.html" className="site-nav">
                    Checkout Style2
                  </a>
                </li>
                <li>
                  <a href="order-success.html" className="site-nav last">
                    Order Success
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        {/* Add other list items as necessary */}
        <li className="mobile-menu-bottom">
          <div className="mobile-links">
            <ul className="list-inline d-inline-flex flex-column w-100">
              <li>
                <a href="login.html" className="d-flex align-items-center">
                  <i className="fa-solid fa-right-to-bracket me-1 "></i> Sign In
                </a>
              </li>
              <li>
                <a href="register.html" className="d-flex align-items-center">
                  <i className="fa-solid fa-user me-1"></i> Register
                </a>
              </li>
              <li>
                <a href="my-account.html" className="d-flex align-items-center">
                  <i className="fa-solid fa-address-card me-1"></i> My Account
                </a>
              </li>
              <li className="Main-title-mobile">Need Help?</li>
              <li>
                <a
                  href="tel:401234567890"
                  className="d-flex align-items-center"
                >
                  <i className="fa-solid fa-phone me-1"></i> (+40) 123 456 7890
                </a>
              </li>
              <li>
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
              {/* Add social icons as needed */}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
