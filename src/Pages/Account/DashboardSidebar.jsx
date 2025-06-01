import React, { useContext, useEffect, useState } from "react";
import imgprofile from "../../assets/images/users/user-img3.jpg";
import AccountInfo from "./AccountInfo";
import AddressBook from "./AddressBook";
import Orders from "./Orders";
import OrdersTracking from "./OrdersTracking";
import Wishlist from "./Wishlist";
import SavedCards from "./SavedCards";
import SecuritySettings from "./SecuritySettings";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import OrderProducts from "./OrderProducts";

const DashboardSidebar = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const viewTap = searchParams.get("viewTap");
    if (viewTap) {
      setActiveTab(viewTap);
    }
  }, [searchParams]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    const params = new URLSearchParams(searchParams);
    params.set("viewTap", id);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const tabs = [
    { id: "info", label: "Account Info" },
    { id: "AddressBook", label: "Address Book" },
    { id: "orders", label: "My Orders" },
    { id: "myProducts", label: "My Products" },
    { id: "orderstracking", label: "Orders Tracking" },
    { id: "wishlist", label: "My Wishlist" },
    { id: "payment", label: "Saved Cards" },
    { id: "security", label: "Settings" },
  ];

  const { logout } = useContext(AuthContext);
  const dataAuth = useContext(AuthContext);
  const { updateCart } = useCart();

  const handleLogout = () => {
    dataAuth.logout();
    updateCart();
    navigate("/LogIn");
  };

  if (dataAuth.isLoading) return <Spinner />;
  if (!dataAuth.user) return <div>User not found or not authenticated</div>;

  return (
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-3 mb-4 mb-lg-0">
          <div className="dashboard-sidebar bg-block">
            <div className="profile-top text-center mb-4 px-3">
              <div className="profile-image mb-3">
                {dataAuth.user.avatar ? (
                  <img
                    className="rounded-circle blur-up"
                    src={imgprofile}
                    alt="user"
                    width="130"
                    loading="lazy"
                  />
                ) : (
                  <img
                    className="rounded-circle blur-up"
                    src={imgprofile}
                    alt="user"
                    width="130"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="profile-detail">
                <div className="Sub-Name-acc mb-1">
                  {dataAuth.user.full_name}
                </div>
                <p className="email-name">{dataAuth.user.email}</p>
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
                  <button onClick={handleLogout} className="nav-link">
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
              <AccountInfo
                name={dataAuth.user.full_name}
                email={dataAuth.user.email}
              />
            )}
            {activeTab === "AddressBook" && <AddressBook />}
            {activeTab === "orders" && <Orders orders={orders} />}
            {activeTab === "orderstracking" && (
              <OrdersTracking orders={orders} />
            )}
            {activeTab === "wishlist" && <Wishlist />}
            {activeTab === "myProducts" && <OrderProducts orders={orders} />}
            {activeTab === "payment" && <SavedCards />}
            {activeTab === "security" && <SecuritySettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
