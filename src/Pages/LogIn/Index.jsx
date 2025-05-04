import { useState } from "react";
import SocialMediaLogin from "../../Components/SocialMediaLogin";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Button from "../../Components/common/Button";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formInput, setFormInput] = useState({
    email: "",
    pass: "",
    rememberPass: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInput);
  };

  const handleCheckBox = (e) => {
    setFormInput({
      ...formInput,
      rememberPass: e.target.checked,
    });
  };

  return (
    <>
      <PageHeader title="LogIn" />
      <div className="container">
        <div className="login-register pt-2 mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="inner h-100 bor-form">
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  action="#"
                  className="customer-form"
                >
                  <div className="main-title-2 text-center fs-4 mb-3 mt-1">
                    Login
                  </div>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label
                        className="form-label-title"
                        htmlFor="CustomerEmail"
                      >
                        Email <span className="required"></span>
                      </label>
                      <input
                        type="email"
                        name="customer[email]"
                        placeholder="Email"
                        id="CustomerEmail"
                        required
                        value={formInput.email}
                        onChange={(e) =>
                          setFormInput({
                            ...formInput,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-12">
                      <label
                        className="form-label-title"
                        htmlFor="CustomerPassword"
                      >
                        Password <span className="required"></span>
                      </label>
                      <div className="password-input-wrapper position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="customer[password]"
                          placeholder="Password"
                          id="CustomerPassword"
                          required
                          value={formInput.pass}
                          onChange={(e) =>
                            setFormInput({
                              ...formInput,
                              pass: e.target.value,
                            })
                          }
                        />
                        <button
                          type="button"
                          className="password-toggle-btn position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 me-2"
                          onClick={togglePasswordVisibility}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <div className="login-remember-forgot d-flex justify-content-between align-items-center">
                        <div className="remember-check customCheckbox">
                          <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={formInput.rememberPass}
                            onChange={handleCheckBox}
                          />
                          <label htmlFor="remember"> Remember me</label>
                        </div>
                        <Link to="forgot-password.html">
                          Forgot your password ?
                        </Link>
                      </div>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <Button
                        label="Login"
                        type="submit"
                        primary
                        className="w-100"
                      />
                    </div>
                  </div>
                  <SocialMediaLogin />
                </form>
                <div className="login-signup-text mt-4 mb-2 fs-6 text-center text-muted">
                  Don't have an account?{" "}
                  <Link to="/SignUp" className="btn-link">
                    Sign up now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
