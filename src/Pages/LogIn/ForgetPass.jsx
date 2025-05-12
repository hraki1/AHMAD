import React, { useState } from "react";
import PageHeader from "../../Components/layout/Header/PageHeader";
// Assuming you have a Button component or you can use the standard button element
// import Button from "../../Components/Button";

export default function ForgetPass() {
  const [formInput, setFormInput] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here
    setLoading(false);
    console.log(formInput);
  };

  return (
    <div>
      <PageHeader title="Forget Password" />
      <div className="container">
        <div className="login-register pt-2 mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="inner h-100 bor-form">
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  className="customer-form"
                >
                  <div className="main-title-2 text-center fs-4 mb-3 mt-1">
                    Forget Password
                  </div>
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label
                        htmlFor="CustomerEmail"
                        className="form-label-title"
                      >
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        id="CustomerEmail"
                        required
                        placeholder="Email"
                        value={formInput.email}
                        onChange={(e) =>
                          setFormInput({ ...formInput, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group col-12 mb-0">
                      <button
                        type="submit"
                        className="w-100 btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Reset My Password"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
