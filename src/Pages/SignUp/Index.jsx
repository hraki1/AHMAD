import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import SocialMediaRegister from "../../Components/SocialMediaLogin";

const Index = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    pass: "",
    confiPass: "",
    agreePolicy: false,
  });

  const [errors, setErrors] = useState({});

  // Password strength checker function
  const isStrongPassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Username
    if (!formInput.name.trim()) {
      newErrors.name = "Username is required.";
    }

    // Email
    if (!formInput.email.trim()) {
      newErrors.email = "Email is required.";
    }

    // Password
    if (!formInput.pass) {
      newErrors.pass = "Password is required.";
    } else if (!isStrongPassword(formInput.pass)) {
      newErrors.pass =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    // Confirm password
    if (!formInput.confiPass) {
      newErrors.confiPass = "Please confirm your password.";
    } else if (formInput.pass !== formInput.confiPass) {
      newErrors.confiPass = "Passwords do not match.";
    }

    // Terms agreement
    if (!formInput.agreePolicy) {
      newErrors.agreePolicy = "You must agree to the terms & policy.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // All validations passed
      console.log("Submitting data:", formInput);
      // Send data to backend here
    }
  };

  const handleCheckBox = (e) => {
    setFormInput({
      ...formInput,
      agreePolicy: e.target.checked,
    });
  };

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
                      Sign up
                    </div>
                    <div className="form-row">
                      {/* Username */}
                      <div className="form-group col-12">
                        <label
                          className="form-label-title"
                          htmlFor="CustomerUsername"
                        >
                          User Name <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          id="CustomerUsername"
                          placeholder="Username"
                          value={formInput.name}
                          onChange={(e) =>
                            setFormInput({ ...formInput, name: e.target.value })
                          }
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
                          E-mail <span className="required"></span>
                        </label>
                        <input
                          type="email"
                          id="CustomerEmail"
                          placeholder="Email"
                          value={formInput.email}
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              email: e.target.value,
                            })
                          }
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
                          Password <span className="required"></span>
                        </label>
                        <input
                          type="password"
                          id="CustomerPassword"
                          placeholder="Password"
                          value={formInput.pass}
                          onChange={(e) =>
                            setFormInput({ ...formInput, pass: e.target.value })
                          }
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
                          Confirm Password <span className="required"></span>
                        </label>
                        <input
                          id="CustomerConfirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          value={formInput.confiPass}
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              confiPass: e.target.value,
                            })
                          }
                          required
                        />
                        {errors.confiPass && (
                          <p className="text-danger mt-1">{errors.confiPass}</p>
                        )}
                      </div>

                      {/* Checkbox */}
                      <div className="form-group col-12">
                        <div className="login-remember-forgot d-flex justify-content-between align-items-center">
                          <div className="agree-check customCheckbox">
                            <input
                              id="agree"
                              name="agree"
                              type="checkbox"
                              checked={formInput.agreePolicy}
                              onChange={handleCheckBox}
                            />
                            <label htmlFor="agree">
                              I agree to{" "}
                              <Link
                                to="/terms"
                                style={{ textDecorationLine: "underline" }}
                              >
                                terms & Policy.
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
                          Register
                        </button>
                      </div>
                    </div>

                    {/* Social Login */}
                    <SocialMediaRegister />

                    {/* Login Link */}
                    <div className="login-signup-text mt-4 mb-2 fs-6 text-center text-muted">
                      Have an account?{" "}
                      <Link to="/LogIn" className="btn-link">
                        Login Now
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
