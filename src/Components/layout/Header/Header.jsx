import React, { useState, useContext } from "react";
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
        <a href="#!">
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
      // هنا ممكن تضيف منطق البحث أو إعادة التوجيه
    }
  };

  return (
    <header className="header d-flex align-items-center header-1 header-fixed">
      <div className="container">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-5 col-sm-3 col-md-3 col-lg-2">
            <Link className="logoImg" to="/">
              <img
                src={logoSarah}
                alt="logo Sarah"
                style={{ maxHeight: "60px" }}
              />
            </Link>
          </div>

          {/* Nav Menu */}
          <div className="col-12 col-lg-7 d-none d-lg-block">
            <nav className="navigation" id="AccessibleNav">
              <ul
                id="siteNav"
                className="site-nav medium center d-flex justify-content-center gap-4"
              >
                <NavItem
                  title={t("Home")}
                  links={[{ to: "/", label: t("Home") }]}
                />
                {!loading && !error && categories.length > 0 && (
                  <li className="megamenu head-drop-down">
                    <Link to="/ShopGrid">
                      {t("Categories")}{" "}
                      <i className="fa-solid fa-angle-down ms-1" />
                    </Link>
                    <div className="megamenu style1">
                      <ul className="row grid--uniform mmWrapper">
                        {categories
                          .filter((cat) => cat.parentId == null)
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
                  title={t("Pages")}
                  links={[
                    { to: "/AboutUs", label: t("AboutUs") },
                    { to: "/ContactUs", label: t("ContactUs") },
                    { to: "/Portfolio", label: t("Portfolio") },
                    { to: "/FAQ", label: t("FAQ") },
                    { to: "/CMS", label: t("CMS") },
                    { to: "/Cart", label: t("Cart") },
                  ]}
                />
                <NavItem
                  title={t("Blog")}
                  links={[
                    { to: "/ShopGrid", label: t("ShopGrid") },
                    { to: "/Collection", label: t("Collection") },
                    { to: "/Wishlist", label: t("Wishlist") },
                  ]}
                />
              </ul>
            </nav>
          </div>

          {/* Search + Icons */}
          <div
            className="d-flex align-items-center justify-content-end col-7 col-sm-9 col-md-9 col-lg-3"
            style={{ gap: "12px" }}
          >
            {/* Search Input - ياخذ أكبر مساحة ممكنة */}
            <div
              className="search-parent iconset"
              style={{
                flexGrow: 1,
                minWidth: "220px", // أقل عرض ممكن
                maxWidth: "100%",
              }}
            >
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder={t("Search...")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  fontSize: "1.3rem",
                  borderRadius: "12px",
                  boxShadow: "0 0 8px rgba(0,0,0,0.12)",
                  border: "1px solid #ccc",
                  transition: "box-shadow 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.boxShadow = "0 0 12px rgba(0,0,0,0.3)")
                }
                onBlur={(e) =>
                  (e.target.style.boxShadow = "0 0 8px rgba(0,0,0,0.12)")
                }
              />
            </div>

            {/* Icons - لا تسمح لها بالضغط على البحث */}
            <div
              className="d-flex align-items-center gap-3"
              style={{ flexShrink: 0 }}
            >
              <div className="d-none d-md-flex gap-3 align-items-center">
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
                style={{ background: "none", border: "none" }}
              >
                <i
                  className="fa-solid fa-bars fa-xl"
                  style={{ color: "#000" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
