import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchCategoryandSub from "../Header/useFetchCategoryandSub"; // عدّل المسار حسب مشروعك

const MobileNav = ({ isMenuOpen, toggleMenu }) => {
  const [dropdowns, setDropdowns] = useState({
    home: false,
    homeSub: false,
    shop: false,
    pages: false,
    blog: false,
    // سنستخدم مفاتيح إضافية للـcategories لاحقًا
  });

  // إضافة حالة مخصصة لفتح/إغلاق كل تصنيف فرعي في Shop
  const [openCats, setOpenCats] = useState({});

  const { categories, loading, error } = useFetchCategoryandSub();

  const toggleDropdown = (key, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // فتح/إغلاق التصنيفات الفرعية
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

        {/* SHOP - CATEGORIES */}
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
              {loading && <li>Loading...</li>}
              {error && <li>حدث خطأ أثناء تحميل التصنيفات</li>}
              {!loading &&
                !error &&
                categories.length > 0 &&
                categories
                  .filter(
                    (cat) => cat.parentId === null || cat.parentId === undefined
                  )
                  .map((mainCat) => {
                    // أبناء التصنيف
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
                              className="icon fa-solid fa-bars"
                              onClick={(e) => toggleCatDropdown(mainCat.id, e)}
                              style={{ cursor: "pointer" }}
                            ></i>
                          )}
                        </div>
                        {/* أبناء التصنيف */}
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
                <Link to="/AboutUs" className="site-nav" onClick={toggleMenu}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ContactUs" className="site-nav" onClick={toggleMenu}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/MYAccount" className="site-nav" onClick={toggleMenu}>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/Portfolio" className="site-nav" onClick={toggleMenu}>
                  Portfolio Page
                </Link>
              </li>
              <li>
                <Link to="/faq" className="site-nav" onClick={toggleMenu}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/CMS" className="site-nav" onClick={toggleMenu}>
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
                <Link to="/ShopGrid" className="site-nav" onClick={toggleMenu}>
                  ShopGrid
                </Link>
              </li>
              <li>
                <Link
                  to="/Collection"
                  className="site-nav"
                  onClick={toggleMenu}
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/Wishlist" className="site-nav" onClick={toggleMenu}>
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
                <Link
                  to="/LogIn"
                  className="d-flex align-items-center"
                  onClick={toggleMenu}
                >
                  <i className="fa-solid fa-right-to-bracket me-1"></i> Sign In
                </Link>
              </li>
              <li className="mb-3 pt-1">
                <Link
                  to="/SignUp"
                  className="d-flex align-items-center"
                  onClick={toggleMenu}
                >
                  <i className="fa-solid fa-user me-1"></i> Register
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  to="/MYAccount"
                  className="d-flex align-items-center"
                  onClick={toggleMenu}
                >
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
