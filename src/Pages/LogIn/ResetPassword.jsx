import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../Components/layout/Header/PageHeader";
import Button from "../../Components/common/Button";
import { baseUrl } from "../API/ApiConfig";
import toast, { Toaster } from "react-hot-toast";
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
        text: "Password must include uppercase, lowercase, number, and be at least 8 characters.",
        type: "danger",
      });

    if (newPassword !== confirmPassword)
      return setMessage({ text: "Passwords do not match.", type: "danger" });

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
        toast.success("Password reset successful!");
      } else {
        setMessage({ text: data.message || "Reset failed.", type: "danger" });
      }
    } catch {
      setMessage({ text: "An unexpected error occurred.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <PageHeader title="Reset Password" />
      <div className="container">
        <div className="row justify-content-center pt-5">
          <div className="col-md-6">
            {success ? (
              <div className="text-center p-4 bor-form">
                <h2 className="text-success mb-3">
                  Your password has been changed successfully! !
                </h2>
                <p>You can now log in with your new password. .</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bor-form p-4">
                <h2 className="text-center mb-4">Reset Your Password</h2>

                {["newPassword", "confirmPassword"].map((name, i) => (
                  <div className="form-group mb-3" key={name}>
                    <label>
                      {i === 0 ? "New Password" : "Confirm Password"}{" "}
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
                          i === 0 ? "Enter new password" : "Re-enter password"
                        }
                        required
                      />
                      {i === 0 && (
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 me-2"
                          aria-label="Toggle Password"
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
                  label={loading ? "Resetting..." : "Reset Password"}
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
