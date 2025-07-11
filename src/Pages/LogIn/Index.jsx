import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import SocialMediaLogin from "../../Components/SocialMediaLogin";
import { Eye, EyeOff } from "lucide-react";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Button from "../../Components/common/Button";
import { baseUrl } from "../API/ApiConfig";
import { useCart } from "../../Context/CartContext";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useTranslation } from "react-i18next";
const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";
  const { updateCart } = useCart();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isRTL = document.documentElement.dir === "rtl";

  const ctx = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";

  const [formInput, setFormInput] = useState({
    email: "",
    pass: "",
    rememberPass: false,
  });

  // ✅ when load page if remmbered Fill Forms
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormInput((prev) => ({
        ...prev,
        email: savedEmail,
        rememberPass: true,
      }));
    }
  }, []);

  const handleCheckBox = (e) => {
    setFormInput({
      ...formInput,
      rememberPass: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formInput.email,
          password: formInput.pass,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem("expiration", expirationTime.toString());

        if (data.user && data.user.id) {
          localStorage.setItem("userId", data.user.id);
          ctx.login(data.token, data.user.id);
        }

        if (formInput.rememberPass) {
          localStorage.setItem("rememberedEmail", formInput.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        await updateCart();

        navigate(from || redirectPath, { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };
  const { t } = useTranslation();
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
                    {t(`LogIn`)}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label
                        htmlFor="CustomerEmail"
                        className="form-label-title"
                      >
                        {t(`Email`)} <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="CustomerEmail"
                        required
                        placeholder={t("form.email")}
                        value={formInput.email}
                        onChange={(e) =>
                          setFormInput({ ...formInput, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group col-12">
                      <label
                        htmlFor="CustomerPassword"
                        className="form-label-title"
                      >
                        {t(`Password`)} <span className="required">*</span>
                      </label>
                      <div className="password-input-wrapper position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="CustomerPassword"
                          required
                          placeholder={t("form.password")}
                          value={formInput.pass}
                          onChange={(e) =>
                            setFormInput({ ...formInput, pass: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="password-toggle-btn position-absolute top-50 translate-middle-y bg-transparent border-0 me-2"
                          style={{ [isRTL ? "left" : "right"]: 0 }}
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
                            type="checkbox"
                            checked={formInput.rememberPass}
                            onChange={handleCheckBox}
                          />
                          <label htmlFor="remember">{t(`Remember_me`)}</label>
                        </div>
                        <Link to="/ForgetPass">
                          {t(`Forgot_your_password`)}
                        </Link>
                      </div>
                    </div>

                    <div className="form-group col-12 mb-0">
                      <Button
                        label={loading ? t(`Logging_in`) : t(`Login`)}
                        type="submit"
                        primary
                        className="w-100"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <SocialMediaLogin />
                </form>

                <div className="login-signup-text mt-4 mb-2 fs-6 text-center text-muted">
                  {t(`Don't_have_an_account?`)}{" "}
                  <Link to="/SignUp" className="btn-link">
                    {t(`Sign_up_now`)}
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
