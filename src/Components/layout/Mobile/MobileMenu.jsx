import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchCategoryandSub from "../Header/useFetchCategoryandSub"; // Adjust the path as needed
import { AuthContext } from "../../../Context/AuthContext";
import { useCart } from "../../../Context/CartContext";
import { useTranslation } from "react-i18next";

const AccountLinksMobile = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const { updateCart } = useCart();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogoutMobile = () => {
    logout();
    updateCart();
    navigate("/LogIn");
    if (toggleMenu) {
      toggleMenu();
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className="mb-3 pt-1 mt-3">
            <Link
              to="/MYAccount"
              className="d-flex align-items-center"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-address-card me-1"></i> {t("MyAccount")}
            </Link>
          </li>
          <li className="mb-3 pt-1">
            <Link
              to="/Wishlist"
              className="d-flex align-items-center"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-heart me-1"></i> {t("Wishlist")}
            </Link>
          </li>
          <li className="pt-1">
            <button
              onClick={handleLogoutMobile}
              className="d-flex align-items-center btn-link p-0 text-start"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <i className="fa-solid fa-right-from-bracket me-1"></i>{" "}
              {t("SignOut")}
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="mb-3 pt-1 mt-3">
            <Link
              to="/LogIn"
              className="d-flex align-items-center"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-right-to-bracket me-1"></i> {t("LogIn")}
            </Link>
          </li>
          <li className="mb-3 pt-1">
            <Link
              to="/SignUp"
              className="d-flex align-items-center"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-user me-1"></i> {t("SignUp")}
            </Link>
          </li>
          <li className="pt-1">
            <Link
              to="/Wishlist"
              className="d-flex align-items-center"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-heart me-1"></i> {t("Wishlist")}
            </Link>
          </li>
        </>
      )}
    </>
  );
};

const MobileNav = ({ isMenuOpen, toggleMenu }) => {
  const [dropdowns, setDropdowns] = useState({
    home: false,
    homeSub: false,
    shop: false,
    pages: false,
    blog: false,
  });

  const [openCats, setOpenCats] = useState({});
  const { categories, loading, error } = useFetchCategoryandSub();
  const { t } = useTranslation();

  const toggleDropdown = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleCatDropdown = (catId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCats((prev) => ({
      ...prev,
      [catId]: !prev[catId],
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
            {t("Home")}
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
                  <Link to="/" className="site-nav" onClick={toggleMenu}>
                    {t("Home")}
                  </Link>
                  <i
                    className="icon fa-solid fa-bars me-2"
                    onClick={(e) => toggleDropdown("homeSub", e)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                {dropdowns.homeSub && (
                  <ul className="lvl-3 d-block" id="home-sub-dropdown">
                    <li>
                      <Link to="/" className="site-nav" onClick={toggleMenu}>
                        Home 1
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>

        {/* SHOP - CATEGORIES */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {t("Categories")}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("shop", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.shop && (
            <ul className="lvl-2 d-block" id="shop-dropdown">
              {loading && <li>{t("Loading...")}</li>}
              {error && <li>{t("Error When Get Data")}</li>}
              {!loading &&
                !error &&
                categories.length > 0 &&
                categories
                  .filter(
                    (cat) => cat.parentId === null || cat.parentId === undefined
                  )
                  .map((mainCat) => {
                    const subCategories = categories.filter(
                      (subCat) => subCat.parentId === mainCat.id
                    );
                    return (
                      <li key={mainCat.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            to={`/ShopGrid?category=${mainCat.id}`}
                            className="site-nav"
                            onClick={toggleMenu}
                          >
                            {mainCat.title}
                          </Link>
                          {subCategories.length > 0 && (
                            <i
                              className="icon fa-solid fa-bars me-2"
                              onClick={(e) => toggleCatDropdown(mainCat.id, e)}
                              style={{ cursor: "pointer" }}
                            ></i>
                          )}
                        </div>
                        {subCategories.length > 0 && openCats[mainCat.id] && (
                          <ul className="lvl-3 d-block ms-3">
                            {subCategories.map((subCat) => (
                              <li key={subCat.id}>
                                <Link
                                  to={`/ShopGrid?category=${mainCat.id}&subcategory=${subCat.id}`}
                                  className="site-nav"
                                  onClick={toggleMenu}
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
          )}
        </li>

        {/* Pages */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {t("Pages")}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("pages", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.pages && (
            <ul className="lvl-2 d-block" id="pages-dropdown">
              <li>
                <Link to="/AboutUs" className="site-nav" onClick={toggleMenu}>
                  {t("AboutUs")}
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="site-nav" onClick={toggleMenu}>
                  {t("ContactUs")}
                </Link>
              </li>
              <li>
                <Link to="/Portfolio" className="site-nav" onClick={toggleMenu}>
                  {t("Portfolio")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="site-nav" onClick={toggleMenu}>
                  {t("FAQ")}
                </Link>
              </li>
              <li>
                <Link to="/CMS" className="site-nav" onClick={toggleMenu}>
                  {t("CMS")}
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Blog */}
        <li className="lvl1 parent megamenu">
          <Link to="#" onClick={(e) => e.preventDefault()}>
            {t("Blog")}
            <i
              className="icon fa-solid fa-bars"
              onClick={(e) => toggleDropdown("blog", e)}
              style={{ cursor: "pointer" }}
            ></i>
          </Link>
          {dropdowns.blog && (
            <ul className="lvl-2 d-block" id="blog-dropdown">
              <li>
                <Link to="/ShopGrid" className="site-nav" onClick={toggleMenu}>
                  {t("ShopGrid")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Collection"
                  className="site-nav"
                  onClick={toggleMenu}
                >
                  {t("Collection")}
                </Link>
              </li>
              <li>
                <Link to="/Wishlist" className="site-nav" onClick={toggleMenu}>
                  {t("Wishlist")}
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Bottom Section */}
        <li className="mobile-menu-bottom">
          <div className="mobile-links">
            <ul className="list-inline d-inline-flex flex-column w-100">
              <AccountLinksMobile toggleMenu={toggleMenu} />
              <li className="Main-title-mobile">{t("NeedHelp")}</li>
              <li className="mb-3 pt-1">
                <a
                  href="tel:401234567890"
                  className="d-flex align-items-center "
                >
                  <i className="fa-solid fa-phone me-1 lab-ltr"></i>
                  <div className="lab-ltr">{t("Phone")}</div>
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
            <div className="Main-title-mobile">{t("FollowUs")}</div>
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
