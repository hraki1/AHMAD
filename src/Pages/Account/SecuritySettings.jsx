import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SecuritySettings = () => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState({
    desktopNotifications: true,
    enableNotifications: false,
    activityNotifications: false,
    partnerOffers: false,
    newsletter: false,
  });

  const [deactivateReason, setDeactivateReason] = useState("privacy");
  const [deleteReason, setDeleteReason] = useState("no-longer-usable");

  const handleNotificationChange = (e) => {
    const { id, checked } = e.target;
    setNotifications((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleDeactivateChange = (e) => {
    setDeactivateReason(e.target.value);
  };

  const handleDeleteChange = (e) => {
    setDeleteReason(e.target.value);
  };

  const handleDeactivateAccount = () => {
    console.log("Account deactivated");
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  return (
    <div className="h-100" id="security">
      <div className="settings-card mt-0 h-100">
        <div className="dashboard-title d-flex-justify-center justify-content-between mb-4">
          <div className="title-account">{t("settings")}</div>
        </div>

        <div className="settings-book-section dashboard-detail">
          <div className="row">
            {/* Notifications Section */}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="account-setting">
                <h4 className="mb-3">{t("notifications")}</h4>
                <div className="account-detail form-group">
                  <div className="customCheckbox clearfix mb-2">
                    <input
                      name="NotificationsAC"
                      id="desktopNotifications"
                      type="checkbox"
                      checked={notifications.desktopNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="desktopNotifications" className="mb-0">
                      {t("allowDesktopNotifications")}
                    </label>
                  </div>
                  <div className="customCheckbox clearfix mb-2">
                    <input
                      name="NotificationsAC"
                      id="enableNotifications"
                      type="checkbox"
                      checked={notifications.enableNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="enableNotifications" className="mb-0">
                      {t("enableNotifications")}
                    </label>
                  </div>
                  <div className="customCheckbox clearfix mb-2">
                    <input
                      name="NotificationsAC"
                      id="activityNotifications"
                      type="checkbox"
                      checked={notifications.activityNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="activityNotifications" className="mb-0">
                      {t("activityNotifications")}
                    </label>
                  </div>
                  <div className="customCheckbox clearfix mb-2">
                    <input
                      name="NotificationsAC"
                      id="partnerOffers"
                      type="checkbox"
                      checked={notifications.partnerOffers}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="partnerOffers" className="mb-0">
                      {t("partnerOffers")}
                    </label>
                  </div>
                  <div className="customCheckbox clearfix mb-2">
                    <input
                      name="NotificationsAC"
                      id="newsletter"
                      type="checkbox"
                      checked={notifications.newsletter}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="newsletter" className="mb-0">
                      {t("newsletter")}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Deactivate Account Section */}
            <div className="col-12 col-sm-12 col-md-6">
              <div className="account-setting">
                <div className="title-account mb-3">
                  {t("deactivateAccount")}
                </div>
                <div className="account-detail form-group">
                  <div className="customRadio clearfix mb-2">
                    <input
                      name="DeactivateAC"
                      id="d1"
                      type="radio"
                      value="privacy"
                      checked={deactivateReason === "privacy"}
                      onChange={handleDeactivateChange}
                    />
                    <label htmlFor="d1" className="mb-0">
                      {t("privacyConcern")}
                    </label>
                  </div>
                  <div className="customRadio clearfix mb-2">
                    <input
                      name="DeactivateAC"
                      id="d2"
                      type="radio"
                      value="temporary"
                      checked={deactivateReason === "temporary"}
                      onChange={handleDeactivateChange}
                    />
                    <label htmlFor="d2" className="mb-0">
                      {t("temporary")}
                    </label>
                  </div>
                  <div className="customRadio clearfix mb-2">
                    <input
                      name="DeactivateAC"
                      id="d3"
                      type="radio"
                      value="other"
                      checked={deactivateReason === "other"}
                      onChange={handleDeactivateChange}
                    />
                    <label htmlFor="d3" className="mb-0">
                      {t("other")}
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm my-2"
                    onClick={handleDeactivateAccount}
                  >
                    {t("deactivateAccountBtn")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="account-setting">
            <div className="title-account mb-3">{t("deleteAccount")}</div>
            <div className="account-detail form-group">
              <div className="customRadio clearfix mb-2">
                <input
                  name="DeleteAC"
                  id="da1"
                  type="radio"
                  value="no-longer-usable"
                  checked={deleteReason === "no-longer-usable"}
                  onChange={handleDeleteChange}
                />
                <label htmlFor="da1" className="mb-0">
                  {t("noLongerUsable")}
                </label>
              </div>
              <div className="customRadio clearfix mb-2">
                <input
                  name="DeleteAC"
                  id="da2"
                  type="radio"
                  value="switch-account"
                  checked={deleteReason === "switch-account"}
                  onChange={handleDeleteChange}
                />
                <label htmlFor="da2" className="mb-0">
                  {t("switchAccount")}
                </label>
              </div>
              <div className="customRadio clearfix mb-2">
                <input
                  name="DeleteAC"
                  id="da3"
                  type="radio"
                  value="other"
                  checked={deleteReason === "other"}
                  onChange={handleDeleteChange}
                />
                <label htmlFor="da3" className="mb-0">
                  {t("other")}
                </label>
              </div>
              <button
                type="button"
                className="btn btn-sm my-2"
                onClick={handleDeleteAccount}
              >
                {t("deleteAccountBtn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
