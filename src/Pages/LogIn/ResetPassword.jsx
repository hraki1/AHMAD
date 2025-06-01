import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Button from "../../Components/common/Button";
import { baseUrl } from "../API/ApiConfig";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
export default function ResetPassword() {
  const [formInput, setFormInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setMessage({ text: "", type: "" });
  };
  const { t } = useTranslation();
  const isStrong = (password) =>
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    password.length >= 8;
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = formInput;

    if (!isStrong(newPassword))
      return setMessage({
        text: t(`PasswordRequirements`),
        type: "danger",
      });

    if (newPassword !== confirmPassword)
      return setMessage({ text: t(`PasswordsDoNotMatch`), type: "danger" });

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/auth/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword, token }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast.success(t(`PasswordResetSuccessful`));
      } else {
        setMessage({ text: data.message || t(`ResetFailed`), type: "danger" });
      }
    } catch {
      setMessage({ text: t(`UnexpectedError`), type: "danger" });
    } finally {
      setLoading(false);
    }
  };
  const isRTL = document.documentElement.dir === "rtl";

  return (
    <>
      <Toaster />
      <PageHeader title={t(`Reset_password`)} hideHome={true} />
      <div className="container">
        <div className="row justify-content-center pt-5">
          <div className="col-md-6">
            {success ? (
              <div className="text-center p-4 bor-form">
                <h2 className="text-success mb-3">
                  {t(`PasswordChangedTitle`)}
                </h2>
                <p>{t(`PasswordChangedDescription`)}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bor-form p-4">
                <h2 className="text-center mb-4">{t(`Reset_password`)}</h2>

                {["newPassword", "confirmPassword"].map((name, i) => (
                  <div className="form-group mb-3" key={name}>
                    <label>
                      {i === 0 ? t(`New_Password`) : t(`Confirm_Password`)}{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name={name}
                        value={formInput[name]}
                        onChange={handleChange}
                        className="form-control"
                        placeholder={
                          i === 0
                            ? t(`Enter_new_password`)
                            : t(`Re-enter_password`)
                        }
                        required
                      />
                      {i === 0 && (
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="password-toggle-btn position-absolute top-50 translate-middle-y bg-transparent border-0 me-2"
                          aria-label="Toggle Password"
                          style={{ [isRTL ? "left" : "right"]: 0 }}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {message.text && (
                  <p className={`text-${message.type} mt-1`}>{message.text}</p>
                )}

                <Button
                  label={loading ? t("Resetting") : t("Reset_password")}
                  type="submit"
                  primary
                  className="w-100 mt-3"
                  disabled={loading}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
