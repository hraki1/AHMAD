import React from "react";
import imgOne from "../../assets/images/icons/sale.png";
import imgTow from "../../assets/images/icons/homework.png";
import imgThree from "../../assets/images/icons/order.png";
const AccountInfo = ({ name, email }) => {
  return (
    <div class="col-12 col-sm-12 col-md-12 col-lg-9">
      <div class="dashboard-content tab-content h-100" id="top-tabContent">
        <div className="tab-pane fade h-100 show active" id="info">
          <div className="account-info h-100">
            <div className="welcome-msg mb-4">
              <div className="name-person">
                Hello, <span className="text-primary">{name}</span>
              </div>
              <div className="desc-content mt-3">
                From your My Account Dashboard you have the ability to view a
                snapshot of your recent account activity and update your account
                information. Select a link below to view or edit information.
              </div>
            </div>

            <div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-3 row-cols-1 mb-4">
              <div className="counter-box">
                <div className="bg-block d-flex-center flex-nowrap">
                  <img
                    className="blur-up lazyload"
                    src={imgOne}
                    alt="icon"
                    width="64"
                    height="64"
                  />
                  <div className="content">
                    <h3 className="fs-5 mb-1 text-primary">238</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
              </div>

              <div className="counter-box">
                <div className="bg-block d-flex-center flex-nowrap">
                  <img
                    className="blur-up lazyload"
                    src={imgTow}
                    alt="icon"
                    width="64"
                    height="64"
                  />
                  <div className="content">
                    <h3 className="fs-5 mb-1 text-primary">124</h3>
                    <p>Pending Orders</p>
                  </div>
                </div>
              </div>

              <div className="counter-box">
                <div className="bg-block d-flex-center flex-nowrap">
                  <img
                    className="blur-up lazyload"
                    src={imgThree}
                    alt="icon"
                    width="64"
                    height="64"
                  />
                  <div className="content">
                    <h3 className="fs-5 mb-1 text-primary">102</h3>
                    <p>Awaiting Payments</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-box">
              <div className="mb-3 main-title-2">Account Information</div>
              <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1">
                <div className="box-info mb-4">
                  <div className="box-title d-flex-center">
                    <div className="sub-title-account">Contact Information</div>
                    <a href="#" className="btn-link ms-auto">
                      Edit
                    </a>
                  </div>
                  <div className="box-content mt-3">
                    <div className="Sub-Name-acc ms-1 mb-3">{name}</div>
                    <p className="mb-2 email-box-content ms-1">{email}</p>
                    <p>
                      <a href="#" className="btn-link ms-1">
                        Change Password
                      </a>
                    </p>
                  </div>
                </div>

                <div className="box-info mb-4">
                  <div className="box-title d-flex-center">
                    <div className="sub-title-account">Newsletters</div>
                    <a href="#" className="btn-link ms-auto">
                      Edit
                    </a>
                  </div>
                  <div className="box-content mt-3">
                    <p>You are currently not subscribed to any newsletter.</p>
                  </div>
                </div>
              </div>

              <div className="box-info mb-4">
                <div className="box-title d-flex-center">
                  <div className="sub-title-account">Address Book</div>
                  <a href="#" className="btn-link ms-auto">
                    Edit
                  </a>
                </div>
                <div className="row row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1">
                  <div className="box-content mt-3">
                    <div className="Sub-Name-acc ms-1 mb-3">
                      Default Billing Address
                    </div>
                    <address className="mb-2 email-box-content ms-1">
                      123, The Company Name Inc,
                      <br />
                      Street Road City name,
                      <br />
                      State name and Zip code.
                    </address>
                    <p>
                      <a href="#" className="btn-link ms-1">
                        Edit Address
                      </a>
                    </p>
                  </div>

                  <div className="box-content mt-3">
                    <div className="Sub-Name-acc ms-1 mb-3">
                      Default Shipping Address
                    </div>
                    <address className="mb-2 email-box-content ms-1">
                      You have not set a default shipping address.
                    </address>
                    <p>
                      <a href="#" className="btn-link ms-1">
                        Edit Address
                      </a>
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
