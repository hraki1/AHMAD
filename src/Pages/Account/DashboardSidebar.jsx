import React, { useState } from "react";
import imgprofile from "../../assets/images/users/user-img3.jpg";
import AccountInfo from "./AccountInfo";
import AddressBook from "./AddressBook";
import Orders from "./Orders";
import OrdersTracking from "./OrdersTracking";
import Wishlist from "./Wishlist";
import SavedCards from "./SavedCards";
import SecuritySettings from "./SecuritySettings";

const DashboardSidebar = () => {
  const [activeTab, setActiveTab] = useState("info");

  const userInfo = {
    name: "Ahmad Otoum",
    email: "info@example.com",
  };

  const tabs = [
    { id: "info", label: "Account Info" },
    { id: "AddressBook", label: "Address Book" },
    { id: "orders", label: "My Orders" },
    { id: "orderstracking", label: "Orders Tracking" },
    { id: "wishlist", label: "My Wishlist" },
    { id: "payment", label: "Saved Cards" },
    { id: "security", label: "Settings" },
  ];

  const handleTabClick = (id) => {
    console.log(`Tab clicked: ${id}`); // Display the tab being clicked
    setActiveTab(id);
  };

  console.log(`Current active tab: ${activeTab}`); // Log the current active tab

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 mb-4 mb-lg-0">
          <div className="dashboard-sidebar bg-block">
            <div className="profile-top text-center mb-4 px-3">
              <div className="profile-image mb-3">
                <img
                  className="rounded-circle blur-up"
                  data-src={imgprofile}
                  src={imgprofile}
                  alt="user"
                  width="130"
                  loading="lazy"
                />
              </div>
              <div className="profile-detail">
                <div className="Sub-Name-acc mb-1">{userInfo.name}</div>
                <p className="email-name">{userInfo.email}</p>
              </div>
            </div>

            <div className="dashboard-tab">
              <ul className="nav nav-tabs flex-lg-column border-bottom-0">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link ${
                        activeTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
                <li className="nav-item">
                  <button
                    onClick={() => console.log("Logging out")}
                    className="nav-link"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <div className="dashboard-content bg-block p-4">
            {activeTab === "info" && (
              <AccountInfo name={userInfo.name} email={userInfo.email} />
            )}
            {activeTab === "AddressBook" && <AddressBook />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "orderstracking" && <OrdersTracking />}
            {activeTab === "wishlist" && <Wishlist />}
            {activeTab === "payment" && <SavedCards />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
