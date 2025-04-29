import React from "react";
import imgMan from "../../assets/images/users/user-img1.jpg";
const ReviewSection = () => {
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
          <form className="product-review-form new-review-form">
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
                />
              </div>
              <div className="col-sm-6 spr-form-review-title form-group">
                <label htmlFor="review">Review Title</label>
                <input
                  id="review"
                  type="text"
                  name="review"
                  className="spr-form-input spr-form-input-text"
                />
              </div>
              <div className="col-sm-6 spr-form-review-rating form-group">
                <label>Rating</label>
                <div className="product-review pt-1">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <a href="#" key={i}>
                        <i className="fa-regular fa-star"></i>
                      </a>
                    ))}
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
                    name="message"
                    rows="3"
                    className="spr-form-input spr-form-input-textarea"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
