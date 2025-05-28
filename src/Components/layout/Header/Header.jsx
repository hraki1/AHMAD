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

const NavItem = ({ title, links }) => {
  const isSingleLink = links.length === 1;

  return (
    <li className="dropdown head-drop-down">
      {isSingleLink ? (
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
      <Link
        to="/Cart"
        // className="header-cart btn-minicart clr-none"
        // data-bs-toggle="offcanvas"
        // data-bs-target="#minicart-drawer"
      >
        <i
          className="fa-solid fa-cart-shopping fa-xl"
          style={{ color: "#000000" }}
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
  const { categories, loading, error } = useFetchCategoryandSub();

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

  useEffect(() => {}, [categories]);

  return (
    <header className="header d-flex align-items-center header-1 header-fixed">
      <div className="container">
        <div className="row">
          <div className="logo col-5 col-sm-3 col-md-3 col-lg-2 align-self-center">
            <Link className="logoImg" to="/">
              <img src={logoSarah} alt="logo Sarah" />
            </Link>
          </div>
          <div className="col-1 col-sm-1 col-md-1 col-lg-8 align-self-center d-menu-col cl-dis">
            <nav className="navigation" id="AccessibleNav">
              <ul id="siteNav" className="site-nav medium center">
                <NavItem title="Home" links={[{ to: "/", label: "Home" }]} />

                {!loading && !error && categories.length > 0 && (
                  <li className="megamenu head-drop-down">
                    <Link to="/ShopGrid">
                      Categories <i className="fa-solid fa-angle-down ms-1" />
                    </Link>
                    <div className="megamenu style1">
                      <ul className="row grid--uniform mmWrapper">
                        {categories
                          .filter(
                            (cat) =>
                              cat.parentId === null ||
                              cat.parentId === undefined
                          )
                          .map((mainCat) => {
                            const subCategories = categories.filter(
                              (subCat) => subCat.parentId === mainCat.id
                            );

                            return (
                              <li
                                key={mainCat.id}
                                className="lvl-1 col-md-3 col-lg-3 w-22"
                              >
                                <Link
                                  to={`/ShopGrid?category=${mainCat.id}`}
                                  className="site-nav lvl-1 menu-title"
                                >
                                  {mainCat.title}
                                </Link>
                                {subCategories.length > 0 && (
                                  <ul className="sub-menu">
                                    {subCategories.map((subCat) => (
                                      <li key={subCat.id}>
                                        <Link
                                          to={`/ShopGrid?category=${mainCat.id}&subcategory=${subCat.id}`}
                                          className="site-nav lvl-2"
                                        >
                                          {subCat.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </li>
                )}
                <NavItem
                  title="Pages"
                  links={[
                    { to: "/AboutUs", label: "About Us" },
                    { to: "/ContactUs", label: "Contact Us" },
                    { to: "/Portfolio", label: "Portfolio Page" },
                    { to: "/FAQ", label: "FAQs Page" },
                    { to: "/CMS", label: "CMS Page" },
                    { to: "/Cart", label: "Cart" },
                    { to: "/CheckOut", label: "CheckOut" },
                  ]}
                />
                <NavItem
                  title="Blog"
                  links={[
                    { to: "/ShopGrid", label: "ShopGrid" },
                    // { to: "/Product", label: "Product" },
                    { to: "/Collection", label: "Collection" },
                    { to: "/Wishlist", label: "Wishlist" },
                  ]}
                />
              </ul>
            </nav>
          </div>
          <div className="col-7 col-sm-9 col-md-9 col-lg-2 align-self-center icons-col text-right">
            <div className="search-parent iconset">
              <div className="site-search" title="Search">
                <Link to="" className="search-icon">
                  <i
                    className="fa fa-magnifying-glass fa-xl"
                    style={{ color: "#000000" }}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
            <AccountMenu />
            <div className="wishlist-link iconset" title="Wishlist">
              <Link to="/Wishlist">
                <i
                  className="fas fa-heart fa-xl"
                  style={{ color: "#000000" }}
                />
                <span className="wishlist-count">0</span>
              </Link>
            </div>
            <HeaderCart
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              handleRemove={handleRemove}
            />
            <button
              type="button"
              className="iconset pe-0 menu-icon js-mobile-nav-toggle mobile-nav--open d-lg-none"
              title="Menu"
              onClick={toggleMenu}
            >
              <i
                className="fa-solid fa-bars fa-xl"
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
