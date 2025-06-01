import React, { useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import { baseUrl } from "../API/ApiConfig.js";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function ForgetPass() {
  const [formInput, setFormInput] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false); // ✅ حالة النجاح

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${baseUrl}/api/auth/password-reset/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formInput.email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        toast.success(t(`ResetLinkSent`));
      } else {
        setErrorMessage(data.message || t(`UserNotFound`));
      }
    } catch (error) {
      setErrorMessage(t(`ServerConnectionError`));
    } finally {
      setLoading(false);
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <Toaster />
      <PageHeader title={t(`Forget_Password`)} hideHome={true} />
      <div className="container">
        <div className="login-register pt-2 mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="inner h-100 bor-form">
                {emailSent ? (
                  <div className="text-center p-4">
                    <h2 className="text-success mb-3">
                      {t(`PasswordResetSent`)}
                    </h2>
                    <p>{t(`CheckEmailInstructions`)}</p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="customer-form"
                  >
                    <div className="main-title-2 text-center fs-4 mb-3 mt-1">
                      {t(`Forget_Password`)}
                    </div>
                    <div className="form-row">
                      <div className="form-group col-12">
                        <label
                          htmlFor="CustomerEmail"
                          className="form-label-title"
                        >
                          {t("form.email")} <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="CustomerEmail"
                          required
                          placeholder={t("form.email")}
                          value={formInput.email}
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              email: e.target.value,
                            })
                          }
                        />
                        {errorMessage && (
                          <div className="form-group col-12">
                            <div className="text-danger text-start mt-2 h6">
                              {errorMessage}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="form-group col-12 mb-0">
                        <button
                          type="submit"
                          className="w-100 btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? t(`Processing`) : t(`Reset_password`)}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
