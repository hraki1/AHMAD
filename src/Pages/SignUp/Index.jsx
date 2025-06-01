import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import SocialMediaRegister from "../../Components/SocialMediaLogin";
import { baseUrl } from "../API/ApiConfig";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    pass: "",
    confiPass: "",
    phone: "",
    agreePolicy: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Password strength checker function
  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  };
  // Validate phone number
  const validatePhoneNumber = (phone) => {
    // Check if the phone number has exactly 10 digits and contains no non-digit characters
    const phoneRegex = /^\d{10}$/; // Only 10 digits
    return phoneRegex.test(phone);
  };

  // Validate form input
  const validateInput = () => {
    const newErrors = {};

    if (!formInput.name.trim()) newErrors.name = "Username is required.";
    if (!formInput.email.trim()) newErrors.email = "Email is required.";
    if (!formInput.pass) newErrors.pass = "Password is required.";
    else if (!isStrongPassword(formInput.pass))
      newErrors.pass =
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
    if (!formInput.confiPass)
      newErrors.confiPass = "Please confirm your password.";
    else if (formInput.pass !== formInput.confiPass)
      newErrors.confiPass = "Passwords do not match.";
    if (!formInput.agreePolicy)
      newErrors.agreePolicy = "You must agree to the terms & policy.";

    // Phone number validation
    if (!formInput.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhoneNumber(formInput.phone)) {
      newErrors.phone =
        "Phone number must be 10 digits and contain no characters.";
    }

    return newErrors;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateInput();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // send data to backend
      try {
        const response = await fetch(`${baseUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formInput.name,
            email: formInput.email,
            password: formInput.pass,
            phone_number: formInput.phone,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          // signIn Success
          console.log("Registration successful:", result);
          navigate("/verify", { state: { email: formInput.email } });
        } else {
          // the type of error
          if (result.message.includes("Email")) {
            setErrors({ email: "This email is already registered." });
          } else if (result.message.includes("Phone already exists")) {
            setErrors({ phone: "This phone number is already registered." });
          } else {
            setErrors({ backend: result.message || "An error occurred" });
          }
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setErrors({ backend: "Network error. Please try again." });
      }
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <PageHeader title="SignUp" />
      <div className="container">
        <div className="login-register pt-2 mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="inner h-100 bor-form">
                <form onSubmit={handleSubmit}>
                  <div className="customer-form">
                    <div className="main-title-2 text-center fs-4 mb-4">
                      {t(`SignUp`)}
                    </div>
                    <div className="form-row">
                      {/* Username */}
                      <div className="form-group col-12">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerUsername"
                        >
                          {t(`UserName`)} <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          id="CustomerUsername"
                          placeholder={t("form.name")}
                          name="name"
                          value={formInput.name}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.name && (
                          <p className="text-danger mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="form-group col-12">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerEmail"
                        >
                          {t("form.email")} <span className="required"></span>
                        </label>
                        <input
                          type="email"
                          id="CustomerEmail"
                          placeholder={t("form.email")}
                          name="email"
                          value={formInput.email}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.email && (
                          <p className="text-danger mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="form-group col-12">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerPassword"
                        >
                          {t(`Password`)} <span className="required"></span>
                        </label>
                        <input
                          type="password"
                          id="CustomerPassword"
                          placeholder={t("form.password")}
                          name="pass"
                          value={formInput.pass}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.pass && (
                          <p className="text-danger mt-1">{errors.pass}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="form-group col-12 mb-4">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerConfirmPassword"
                        >
                          {t("form.confirmPassword")}{" "}
                          <span className="required"></span>
                        </label>
                        <input
                          id="CustomerConfirmPassword"
                          type="password"
                          placeholder={t("form.confirmPassword")}
                          name="confiPass"
                          value={formInput.confiPass}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.confiPass && (
                          <p className="text-danger mt-1">{errors.confiPass}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="form-group col-12">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerPhone"
                        >
                          {t("form.phone")} <span className="required"></span>
                        </label>
                        <input
                          type="tel"
                          id="CustomerPhone"
                          placeholder={t("form.phone")}
                          name="phone"
                          value={formInput.phone}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.phone && (
                          <p className="text-danger mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Checkbox */}
                      <div className="form-group col-12">
                        <div className="login-remember-forgot d-flex justify-content-between align-items-center">
                          <div className="agree-check customCheckbox">
                            <input
                              id="agree"
                              name="agreePolicy"
                              type="checkbox"
                              checked={formInput.agreePolicy}
                              onChange={handleInputChange}
                            />
                            <label htmlFor="agree">
                              {t(`agree`)}{" "}
                              <Link
                                to="/terms"
                                style={{ textDecorationLine: "underline" }}
                              >
                                {t(`terPol`)}{" "}
                              </Link>
                            </label>
                          </div>
                        </div>
                        {errors.agreePolicy && (
                          <p className="text-danger mt-1">
                            {errors.agreePolicy}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="form-group col-12 mb-0">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          {t(`Register`)}
                        </button>
                      </div>
                    </div>

                    {/* Social Login */}
                    <SocialMediaRegister />

                    {/* Login Link */}
                    <div className="login-signup-text mt-4 mb-2 fs-6 text-center text-muted">
                      {t(`Have_an_account`)}{" "}
                      <Link to="/LogIn" className="btn-link">
                        {t(`LoginNow`)}
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
