import React,{useState,useEffect} from "react";
import imgMan from "../../assets/images/users/user-img1.jpg";
const ReviewSection = () => {

  const [reviewForm, setReviewForm] = useState({
      name: "",
      email: "",
      reviewTitle: "",
      body: "",
      rating: 0
    });
  const [errors, setErrors] = useState({
      name: "",
      email: "",
      reviewTitle: "",
      body: "",
      rating: ""
    });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () =>{
    let isValid = true;
    const newErrors = { ...errors };
    
    // Check if all fields are filled
    for (const field in reviewForm) {
      if (field === "rating") {
        if (reviewForm[field] === 0) {
          newErrors[field] = "Rating is required";
          isValid = false;
        }
      } else if (field === "email") {
        if (!reviewForm[field].trim()) {
          newErrors[field] = "Email is required";
          isValid = false;
        } else {
          // Email regex validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(reviewForm[field])) {
            newErrors[field] = "Invalid email format";
            isValid = false;
          }
        }
      } else {
        if (!reviewForm[field].trim()) {
          newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
          isValid = false;
        }
      }
    }
    setErrors(newErrors);
    return isValid;
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    // Validate form before proceeding
    if (validateForm()) {
      // Print form data to console
      console.log("Form Data:", reviewForm);
      // Optionally clear form or show success message here
    }
  };
  return (
    <div id="reviews" className="tab-content pt-5">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4">
          <div className="ratings-main">
            <div className="avg-rating d-flex-center mb-3">
              <h4 className="avg-mark">5.0</h4>
              <div className="avg-content ms-3">
                <p className="text-rating">Average Rating</p>
                <div className="ratings-full product-review">
                  <a className="reviewLink d-flex-center" href="#reviews">
                    {[...Array(4)].map((_, i) => (
                      <i
                        key={i}
                        className="fas fa-star"
                        style={{ color: "gold" }}
                      ></i>
                    ))}
                    <i className="far fa-star" style={{ color: "gold" }}></i>
                    <span className="caption ms-1">3 Reviews</span>
                  </a>
                </div>
              </div>
            </div>

            {[99, 75, 50, 25, 5].map((value, idx) => (
              <div
                className="ratings-container d-flex align-items-center mt-1"
                key={idx}
              >
                <div className="ratings-full product-review m-0">
                  <a
                    className="reviewLink d-flex align-items-center"
                    href="#reviews"
                  >
                    {[...Array(4)].map((_, i) => (
                      <i
                        key={i}
                        className="fas fa-star"
                        style={{ color: "gold" }}
                      ></i>
                    ))}
                    <i className="far fa-star" style={{ color: "gold" }}></i>
                  </a>
                </div>
                <div
                  className="progress w-100"
                  style={{ height: "8px", backgroundColor: "#e9ecef" }}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${value}%`,
                      backgroundColor: "#ffc107",
                    }}
                    aria-valuenow={value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="progress-value">{value}%</div>
              </div>
            ))}
          </div>
          <hr />
          <div className="spr-reviews">
            <div className="spr-form-title main-title-2 mb-4">
              Customer Reviews
            </div>
            {[1, 2].map((review, i) => (
              <div className="spr-review d-flex w-100" key={i}>
                <div className="spr-review-profile flex-shrink-0">
                  <img
                    className="blur-up lazyload"
                    src={imgMan}
                    alt="User"
                    width="200"
                    height="200"
                  />
                </div>
                <div className="spr-review-content flex-grow-1">
                  <div className="d-flex justify-content-between flex-column mb-2">
                    <div className="title-review d-flex align-items-center justify-content-between">
                      <h5 className="name-person text-transform-none mb-0">
                        Eleanor Pena
                      </h5>
                      <span className="product-review spr-starratings m-0">
                        <span className="reviewLink">
                          {[...Array(4)].map((_, i) => (
                            <i
                              key={i}
                              className="fas fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          ))}
                          <i
                            className="far fa-star"
                            style={{ color: "gold" }}
                          ></i>
                        </span>
                      </span>
                    </div>
                  </div>
                  <b className="head-font mb-2">Good and High quality</b>
                  <div className="desc-content">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4">
          <form className="product-review-form new-review-form" onSubmit={handleSubmit}>
            <h3 className="spr-form-title">Write a Review</h3>
            <p>
              Your email address will not be published. Required fields are
              marked *
            </p>
            <fieldset className="row spr-form-contact">
              <div className="col-sm-6 spr-form-contact-name form-group">
                <label htmlFor="nickname">
                  Name <span className="required">*</span>
                </label>
                <input
                  id="nickname"
                  type="text"
                  name="name"
                  required
                  className="spr-form-input spr-form-input-text"
                  placeholder="Name"
                  value={reviewForm.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6 spr-form-contact-email form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="spr-form-input spr-form-input-email"
                  placeholder="E-mail"
                  value={reviewForm.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6 spr-form-review-title form-group">
                <label htmlFor="review">Review Title</label>
                <input
                  id="review"
                  type="text"
                  name="reviewTitle"
                  required
                  className="spr-form-input spr-form-input-text"
                  placeholder="Review Title"
                  value={reviewForm.reviewTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6 spr-form-review-rating form-group">
                <label>Rating</label>
                <div className="product-review pt-1">
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <a
                        href="#"
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          setReviewForm({ ...reviewForm, rating: starValue });
                          if (errors.rating) {
                            setErrors({ ...errors, rating: "" });
                          }
                        }}
                        aria-label={`${starValue} Star`}
                      >
                        <i
                          className={
                            starValue <= reviewForm.rating
                              ? "fas fa-star"
                              : "fa-regular fa-star"
                          }
                          style={{ color: "gold" }}
                        ></i>
                      </a>
                    );
                  })}
                  {errors.rating && (
                    <div className="text-danger" style={{ fontSize: "0.875rem" }}>
                      {errors.rating}
                    </div>
                  )}
                </div>
                </div>
              </div>
              <div className="col-12 spr-form-review-body form-group">
                <label htmlFor="message">
                  Body of Review{" "}
                  <span className="spr-form-review-body-charactersremaining">
                    (1500) characters remaining
                  </span>
                </label>
                <div className="spr-form-input">
                <textarea
                  id="message"
                  name="body"
                  rows="3"
                  className="spr-form-input spr-form-input-textarea"
                  value={reviewForm.body}
                  onChange={handleInputChange}
                ></textarea>
                </div>
              </div>
            </fieldset>
            <div className="spr-form-actions clearfix">
                <input
                  type="submit"
                  className="btn btn-primary spr-button spr-button-primary"
                  value="Submit Review"
                />
              {errors.name && <div className="text-danger">{errors.name}</div>}
              {errors.email && <div className="text-danger">{errors.email}</div>}
              {errors.reviewTitle && <div className="text-danger">{errors.reviewTitle}</div>}
              {errors.body && <div className="text-danger">{errors.body}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
