import React, { useContext, useState } from "react";
import imgOne from "../../assets/images/icons/sale.png";
import imgTow from "../../assets/images/icons/homework.png";
import imgThree from "../../assets/images/icons/order.png";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const AccountInfo = () => {
  const dataAuth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormDate] = useState({
    full_name: dataAuth.user?.full_name || "",
    phone_number: dataAuth.user?.phone_number || "",
    birthday: dataAuth.user?.birthday
      ? new Date(dataAuth.user.birthday).toISOString().split("T")[0]
      : "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormDate({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditInfo = async () => {
    if (isEditing) {
      if (formData.phone_number.length < 10) {
        setError("Phone Number At Least Should Be 10 Digits");
        return;
      }

      const updatedData = {
        ...formData,
        birthday: formData.birthday
          ? new Date(formData.birthday).toISOString()
          : null,
      };
      try {
        const response = await fetch(
          `https://api.sareh-nomow.xyz/api/user/profile/${dataAuth.userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${dataAuth.token}`,
            },
            body: JSON.stringify(updatedData),
          }
        );
        if (response.ok) {
          const updatedUser = await response.json();
          dataAuth.setUser(updatedUser);
          console.log("User info updated successfully.");
          setError("");
        } else {
          setError("Error Editing Data. Check Your Input.");
        }
      } catch (error) {
        console.error("Error updating user info:", error);
        setError("Error Connecting to Server.");
      }
    }

    setIsEditing(!isEditing);
  };

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-9">
      <div className="dashboard-content tab-content h-100" id="top-tabContent">
        <div className="tab-pane fade h-100 show active" id="info">
          <div className="account-info h-100">
            <div className="welcome-msg mb-4">
              <div className="name-person">
                Hello,{" "}
                <span className="text-primary">
                  {!dataAuth.isLoading && dataAuth.user?.full_name}
                </span>
              </div>
            </div>

            {/* Boxes */}
            <div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-3 row-cols-1 mb-4">
              {[imgOne, imgTow, imgThree].map((img, idx) => (
                <div className="counter-box" key={idx}>
                  <div className="bg-block d-flex-center flex-nowrap">
                    <img
                      className="blur-up lazyload"
                      src={img}
                      alt="icon"
                      width="64"
                      height="64"
                    />
                    <div className="content">
                      <h3 className="fs-5 mb-1 text-primary">
                        {idx === 0 ? "238" : idx === 1 ? "124" : "102"}
                      </h3>
                      <p>
                        {idx === 0
                          ? "Total Orders"
                          : idx === 1
                          ? "Pending Orders"
                          : "Awaiting Payments"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Info */}
            <div className="account-box">
              <div className="d-flex">
                <div className="mb-3 main-title-2">Account Information</div>
                <button
                  onClick={handleEditInfo}
                  className="btn btn-link ms-auto h3"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1">
                {/* Phone Number & Name */}
                <div className="box-info mb-4">
                  <div className="box-title d-flex-center">
                    <div className="sub-title-account">
                      <div className="Sub-Name-acc mb-2">Phone Number</div>
                      {!dataAuth.isLoading &&
                        (isEditing ? (
                          <input
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                          />
                        ) : (
                          dataAuth.user?.phone_number
                        ))}
                    </div>
                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}
                  </div>

                  <div className="box-title mt-3">
                    <div className="Sub-Name-acc mb-2">Full Name</div>
                    <div className="sub-title-account ms-1 mb-3">
                      {!dataAuth.isLoading &&
                        (isEditing ? (
                          <input
                            className="form-control"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                          />
                        ) : (
                          dataAuth.user?.full_name
                        ))}
                    </div>

                    <div className="Sub-Name-acc mb-2">Email</div>
                    <p
                      className="mb-3 sub-title-account ms-1"
                      style={{ textTransform: "none" }}
                    >
                      {dataAuth.user?.email}
                    </p>

                    <p>
                      <Link to="#" className="btn-link ms-1">
                        Change Password
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Birthday */}
                <div className="box-info mb-4">
                  <div className="box-title d-flex-center">
                    <div className="sub-title-account">Birthday</div>
                  </div>
                  <div className="box-content mt-3">
                    <p>
                      {!dataAuth.isLoading &&
                        (isEditing ? (
                          <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            max={new Date().toISOString().split("T")[0]}
                            className="form-control"
                          />
                        ) : dataAuth.user?.birthday ? (
                          new Date(dataAuth.user.birthday).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )
                        ) : (
                          "Null"
                        ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
