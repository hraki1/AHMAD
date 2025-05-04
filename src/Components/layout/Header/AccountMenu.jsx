import React from "react";

const AccountLinks = () => (
  <div className="customer-links">
    <ul className="m-0">
      {[
        { href: "LogIn", icon: "fa-right-to-bracket", label: "LogIn" },
        { href: "/SignUp", icon: "fa-user", label: "SignUp" },
        { href: "/MYAccount", icon: "fa-address-card", label: "My Account" },
        { href: "/Wishlist", icon: "fa-heart", label: "Wishlist" },
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
