import React from "react";

const StickyMenubarMobile = () => {
  return (
    <div className="menubar-mobile d-flex align-items-center justify-content-between d-lg-none">
      <div className="menubar-shop menubar-item">
        <a href="shop-grid-view.html">
          <i className="menubar-icon anm anm-th-large-l"></i>
          <span className="menubar-label">Shop</span>
        </a>
      </div>
      <div className="menubar-account menubar-item">
        <a href="my-account.html">
          <i className="menubar-icon icon anm anm-user-al"></i>
          <span className="menubar-label">Account</span>
        </a>
      </div>
      <div className="menubar-search menubar-item">
        <a href="index.html">
          <span className="menubar-icon anm anm-home-l"></span>
          <span className="menubar-label">Home</span>
        </a>
      </div>
      <div className="menubar-wish menubar-item">
        <a href="wishlist-style1.html">
          <span className="span-count position-relative text-center">
            <i className="menubar-icon icon anm anm-heart-l"></i>
            <span className="wishlist-count counter menubar-count">0</span>
          </span>
          <span className="menubar-label">Wishlist</span>
        </a>
      </div>
      <div className="menubar-cart menubar-item">
        <a
          href="#;"
          className="btn-minicart"
          data-bs-toggle="offcanvas"
          data-bs-target="#minicart-drawer"
        >
          <span className="span-count position-relative text-center">
            <i className="menubar-icon icon anm anm-cart-l"></i>
            <span className="cart-count counter menubar-count">2</span>
          </span>
          <span className="menubar-label">Cart</span>
        </a>
      </div>
    </div>
  );
};

export default StickyMenubarMobile;
