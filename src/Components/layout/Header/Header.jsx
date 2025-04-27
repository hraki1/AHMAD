import React from "react";
import { Link } from "react-router-dom";

/* ==== Imports – Images ==== */
import logoSarah from "../../../assets/images/2.png";
import bannerMenu from "../../../assets/images/megamenu/banner-menu.jpg";
import product1Img from "../../../assets/images/products/product1-120x170.jpg";
import product2Img from "../../../assets/images/products/product2-120x170.jpg";
import product3Img from "../../../assets/images/products/product3-120x170.jpg";
import AccountMenu from "./AccountMenu";

const NavItem = ({ title, links }) => (
  <li className="dropdown head-drop-down">
    <a href="#">
      {title} <i className="fa-solid fa-angle-down ms-1" />
    </a>
    <ul className="dropdown">
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.to} className="site-nav">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

const ShopMenu = () => (
  <li className="megamenu head-drop-down">
    <a href="#">
      Shop <i className="fa-solid fa-angle-down ms-1" />
    </a>
    <div className="megamenu style1">
      <ul className="row grid--uniform mmWrapper">
        <li className="lvl-1 col-md-3 col-lg-3 w-22">
          <a href="#;" className="site-nav lvl-1 menu-title">
            Collection Page
          </a>
          <ul className="subLinks">
            <li className="lvl-2">
              <a href="collection-style1.html" className="site-nav lvl-2">
                Collection style
              </a>
            </li>
          </ul>
        </li>
        <li className="lvl-1 col-md-3 col-lg-3 w-22">
          <a href="#;" className="site-nav lvl-1 menu-title">
            Shop Page
          </a>
          <ul className="subLinks">
            <li className="lvl-2">
              <a href="shop-grid-view.html" className="site-nav lvl-2">
                Shop Grid View
              </a>
            </li>
          </ul>
        </li>
        <li className="lvl-1 col-md-3 col-lg-3 w-22">
          <a href="#;" className="site-nav lvl-1 menu-title">
            Shop Other Page
          </a>
          <ul className="subLinks">
            <li className="lvl-2">
              <a href="wishlist-style1.html" className="site-nav lvl-2">
                Wishlist Style1
              </a>
            </li>
          </ul>
        </li>
        <li className="lvl-1 col-md-3 col-lg-3 w-34 banner-col">
          <div className="banner-wrap">
            <a href="shop-left-sidebar.html">
              <img
                className="blur-up lazyload"
                src={bannerMenu}
                alt="banner"
                width={600}
                height={440}
              />
            </a>
            <div className="banner-content">
              <h4>Hot deals</h4>
              <h3>
                Don't miss <br /> Trending
              </h3>
              <div className="banner-save">Save to 50%</div>
              <div className="banner-btn">
                <a href="shop-left-sidebar.html" className="btn">
                  Shop now
                </a>
              </div>
            </div>
            <div className="banner-discount">
              <h3>
                <span>50%</span> Off
              </h3>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </li>
);

export default function Header() {
  return (
    <>
      <header className="header d-flex align-items-center header-1 header-fixed">
        <div className="container">
          <div className="row">
            {/* Logo */}
            <div className="logo col-5 col-sm-3 col-md-3 col-lg-2 align-self-center">
              <a className="logoImg" href="index.html">
                <img src={logoSarah} alt="logo Sarah" />
              </a>
            </div>
            {/* Menu */}
            <div className="col-1 col-sm-1 col-md-1 col-lg-8 align-self-center d-menu-col cl-dis">
              <nav className="navigation" id="AccessibleNav">
                <ul id="siteNav" className="site-nav medium center">
                  <NavItem
                    title="Home"
                    links={[
                      { to: "index.html", label: "Home" },
                      { href: "index2-footwear.html", label: "Footwear" },
                      { href: "index4-electronic.html", label: "Electronic" },
                    ]}
                  />
                  <ShopMenu />
                  <NavItem
                    title="Pages"
                    links={[
                      { to: "/about-us", label: "About Us" },
                      { to: "/contact-us", label: "Contact Us" },
                      { to: "/my-account", label: "My Account" },
                      { to: "/portfolio-page", label: "Portfolio Page" },
                      { to: "/faqs-page", label: "FAQs Page" },
                      { to: "/cms-page", label: "CMS Page" },
                      { to: "/coming-soon", label: "Coming Soon" },
                    ]}
                  />

                  <NavItem
                    title="Blog"
                    links={[
                      { href: "blog-grid.html", label: "Grid View" },
                      { href: "blog-list.html", label: "List View" },
                      { href: "blog-grid-sidebar.html", label: "Left Sidebar" },
                      {
                        href: "blog-list-sidebar.html",
                        label: "Right Sidebar",
                      },
                      { href: "blog-masonry.html", label: "Masonry Grid" },
                      { href: "blog-details.html", label: "Blog Details" },
                    ]}
                  />
                </ul>
              </nav>
            </div>
            {/* Right Icon */}
            <div className="col-7 col-sm-9 col-md-9 col-lg-2 align-self-center icons-col text-right">
              {/* Search */}
              <div className="search-parent iconset">
                <div className="site-search" title="Search">
                  <a
                    href="#;"
                    className="search-icon"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#search-drawer"
                  >
                    <i
                      className="fa fa-magnifying-glass fa-xl"
                      style={{ color: "#000000" }}
                      aria-hidden="true"
                    />
                  </a>
                </div>
                {/* Search Drawer */}
                <div
                  className="search-drawer offcanvas offcanvas-top"
                  tabIndex={-1}
                  id="search-drawer"
                >
                  {/* محتوى السحب للبحث */}
                </div>
              </div>

              {/* Account Menu */}
              <AccountMenu />

              {/* Wishlist */}
              <div className="wishlist-link iconset" title="Wishlist">
                <a href="wishlist-style1.html">
                  <i
                    className="fas fa-heart fa-xl"
                    style={{ color: "#000000" }}
                  />
                  <span className="wishlist-count">0</span>
                </a>
              </div>

              {/* Minicart */}
              <div className="header-cart iconset" title="Cart">
                <a
                  href="#;"
                  className="header-cart btn-minicart clr-none"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#minicart-drawer"
                >
                  <i
                    className="fa-solid fa-cart-shopping fa-xl"
                    style={{ color: "#000000" }}
                  />
                  <span className="cart-count">2</span>
                </a>
              </div>

              {/* Mobile Toggle */}
              <button
                type="button"
                className="iconset pe-0 menu-icon js-mobile-nav-toggle mobile-nav--open d-lg-none"
                title="Menu"
              >
                <i
                  className="fa-solid fa-bars fa-xl"
                  style={{ color: "#000000" }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
