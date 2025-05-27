import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../Context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const AccountLinks = () => {
  const navigate = useNavigate();
  const { updateCart } = useCart();

  const checkAuth = useContext(AuthContext);

  const handleLogout = () => {
    checkAuth.logout();
    updateCart();
    navigate("/LogIn");
  };

  const linkSign = [
    { href: "/MYAccount", icon: "fa-address-card", label: "My Account" },
    { href: "/Wishlist", icon: "fa-heart", label: "Wishlist" },
    {
      onClick: handleLogout,
      icon: "fa-right-from-bracket",
      label: "Sign Out",
    },
  ];

  const linkOut = [
    { href: "/LogIn", icon: "fa-right-to-bracket", label: "LogIn" },
    { href: "/SignUp", icon: "fa-user", label: "SignUp" },
    { href: "/Wishlist", icon: "fa-heart", label: "Wishlist" },
  ];

  return (
    <div className="customer-links">
      <ul className="m-0">
        {(checkAuth.isAuthenticated ? linkSign : linkOut).map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className="btn-link p-0 text-start"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <i className={`fa-solid ${link.icon} fa-lg me-2`} />
                {link.label}
              </button>
            ) : (
              <a href={link.href}>
                <i className={`fa-solid ${link.icon} fa-lg me-2`} />
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AccountMenu = () => {
  const checkAuth = useContext(AuthContext);
  return (
    <div className="account-parent iconset">
      <div className="account-link" title="Account">
        {checkAuth.isAuthenticated ? (
          <i className="fa-solid fa-user fa-xl" />
        ) : (
          <i class="fa-solid fa-right-to-bracket fa-xl"></i>
        )}
      </div>
      <div id="accountBox">
        <AccountLinks />
      </div>
    </div>
  );
};

export default AccountMenu;
