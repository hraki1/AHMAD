import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../Context/CartContext"; // استيراد useCart
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const AccountLinks = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateCart } = useCart(); // الحصول على دالة updateCart من السياق

  const handleLogout = () => {
    ctx.logout();
    updateCart(); // تحديث حالة العربة
    navigate("/LogIn");
    window.location.reload(); // إعادة تحميل الصفحة لتحديث كل الحالات
  };

  const links = [
    { href: "/LogIn", icon: "fa-right-to-bracket", label: "LogIn" },
    { href: "/SignUp", icon: "fa-user", label: "SignUp" },
    { href: "/MYAccount", icon: "fa-address-card", label: "My Account" },
    { href: "/Wishlist", icon: "fa-heart", label: "Wishlist" },
    { onClick: handleLogout, icon: "fa-right-from-bracket", label: "Sign Out" },
  ];

  return (
    <div className="customer-links">
      <ul className="m-0">
        {links.map((link, index) => (
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

const AccountMenu = () => (
  <div className="account-parent iconset">
    <div className="account-link" title="Account">
      <i className="fa-solid fa-user fa-xl" />
    </div>
    <div id="accountBox">
      <AccountLinks />
    </div>
  </div>
);

export default AccountMenu;
