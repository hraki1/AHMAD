import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MiniCart from "../../../Pages/Cart/MiniCart";
import logoSarah from "../../../assets/images/2.png";
import AccountMenu from "./AccountMenu";
import imageCart1 from "../../../assets/images/products/product1-120x170.jpg";
import imageCart2 from "../../../assets/images/products/product2-120x170.jpg";
import MobileMenu from "../Mobile/MobileMenu";
import useFetchCategoryandSub from "./useFetchCategoryandSub";
import { CartContext } from "../../../Context/CartContext";
import { useWishlist } from "../../../Context/WishlistContext";
import { useTranslation } from "react-i18next";

const NavItem = ({ title, links }) => {
  return (
    <li className="dropdown head-drop-down">
      {links.length === 1 ? (
        <Link to={links[0].to} className="site-nav">
          {title} <i className="fa-solid fa-angle-down ms-1" />
        </Link>
      ) : (
        <a href="#">
          {title} <i className="fa-solid fa-angle-down ms-1" />
        </a>
      )}
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
};

const HeaderCart = ({
  cartItems,
  handleQuantityChange,
  handleRemove,
  handleClose,
}) => {
  const { cartCount } = useContext(CartContext);

  return (
    <div className="header-cart iconset" title="Cart">
      <Link to="/Cart">
        <i
          className="fa-solid fa-cart-shopping fa-xl"
          style={{ color: "#000" }}
        />
        <span className="cart-count">{cartCount}</span>
      </Link>
      <MiniCart
        items={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onClose={handleClose}
      />
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { categories, loading, error } = useFetchCategoryandSub();
  const { wishlistItems } = useWishlist();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [cartItems, setCartItems] = useState([
    {
      name: "Women Sandals",
      variant: "Black",
      size: "XL",
      price: 54.0,
      quantity: 1,
      img: imageCart1,
      link: "product-layout1.html",
    },
    {
      name: "Sleeve Round T-Shirt",
      variant: "Yellow",
      size: "M",
      price: 99.0,
      oldPrice: 114.0,
      quantity: 1,
      img: imageCart2,
      link: "product-layout1.html",
    },
  ]);

  const handleQuantityChange = (index, newQty) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQty;
    setCartItems(updatedItems);
  };

  const handleRemove = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Search: ", searchText);
    }
  };

  return (
    <header className="header d-flex align-items-center header-1 header-fixed">
      <div className="container">
        <div className="row align-items-center">
          <div className="row align-items-center g-3 py-2">
            {/* Logo */}
            <div className="col-6 col-lg-2">
              <Link className="logoImg" to="/">
                <img src={logoSarah} alt="logo Sarah" />
              </Link>
            </div>

            {/* Search Input (always visible, larger) */}
            <div className="col-12 col-sm-6 col-lg-4 order-3 order-lg-2">
              <div className="search-parent">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    fontSize: "1.2rem",
                    borderRadius: "12px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            </div>

            {/* Icons */}
            <div className="col-6 col-lg-3 d-flex justify-content-end gap-3 order-2 order-lg-3">
              <div className="d-none d-md-flex align-items-center gap-3">
                <AccountMenu />
                <div className="wishlist-link iconset" title="Wishlist">
                  <Link to="/Wishlist">
                    <i
                      className="fas fa-heart fa-xl"
                      style={{ color: "#000" }}
                    />
                    <span className="wishlist-count">
                      {wishlistItems.length}
                    </span>
                  </Link>
                </div>
              </div>

              <HeaderCart
                cartItems={cartItems}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="iconset pe-0 menu-icon js-mobile-nav-toggle d-lg-none"
                title="Menu"
                onClick={toggleMenu}
              >
                <i
                  className="fa-solid fa-bars fa-xl"
                  style={{ color: "#000" }}
                />
              </button>
            </div>

            {/* Nav Menu */}
            <div className="col-12 d-none d-lg-block col-lg-3">
              <nav className="navigation" id="AccessibleNav">
                <ul
                  id="siteNav"
                  className="site-nav medium center d-flex gap-3 justify-content-center"
                >
                  {/* ...NavItem & Categories same as your original... */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
