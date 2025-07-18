import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../Context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useTranslation } from "react-i18next";

const AccountLinks = () => {
  const navigate = useNavigate();
  const { updateCart } = useCart();
  const checkAuth = useContext(AuthContext);
  const { t } = useTranslation();

  const handleLogout = () => {
    checkAuth.logout();
    updateCart();
    navigate("/LogIn");
  };

  const linkSign = [
    { href: "/MYAccount", icon: "fa-address-card", label: t("MyAccount") },
    { href: "/Wishlist", icon: "fa-heart", label: t("Wishlist") },
    {
      onClick: handleLogout,
      icon: "fa-right-from-bracket",
      label: t("SignOut"),
    },
  ];

  const linkOut = [
    { href: "/LogIn", icon: "fa-right-to-bracket", label: t("LogIn") },
    { href: "/SignUp", icon: "fa-user", label: t("SignUp") },
    { href: "/Wishlist", icon: "fa-heart", label: t("Wishlist") },
  ];

  return (
    <div className="customer-links">
      <ul className="m-0">
        {(checkAuth.isAuthenticated ? linkSign : linkOut).map((link, index) => (
          <li key={index} className="account-link-item">
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className="btn-link p-0 text-start d-flex align-items-center"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="icon">
                  <i className={`fa-solid ${link.icon} fa-lg`} />
                </span>
                <span className="label ms-2">{link.label}</span>
              </button>
            ) : (
              <a href={link.href} className="d-flex align-items-center">
                <span className="icon">
                  <i className={`fa-solid ${link.icon} fa-lg`} />
                </span>
                <span className="label ms-2">{link.label}</span>
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
          <i className="fa-solid fa-right-to-bracket fa-xl" />
        )}
      </div>
      <div id="accountBox">
        <AccountLinks />
      </div>
    </div>
  );
};

export default AccountMenu;
