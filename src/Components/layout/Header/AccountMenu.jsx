import React from "react";

const AccountLinks = () => (
  <div className="customer-links">
    <ul className="m-0">
      {[
        { href: "login.html", icon: "fa-right-to-bracket", label: "Sign In" },
        { href: "register.html", icon: "fa-user", label: "Register" },
        { href: "register.html", icon: "fa-address-card", label: "My Account" },
        { href: "register.html", icon: "fa-heart", label: "Wishlist" },
        { href: "register.html", icon: "fa-code-compare", label: "Compare" },
        {
          href: "register.html",
          icon: "fa-right-from-bracket",
          label: "Sign Out",
        },
      ].map((link, index) => (
        <li key={index}>
          <a href={link.href}>
            <i className={`fa-solid ${link.icon} fa-lg me-2`} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

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
