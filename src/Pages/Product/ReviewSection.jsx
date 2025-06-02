import { useState, useEffect } from "react";
import imgMan from "../../assets/images/users/user-avatar.png";
import { baseUrl } from "../API/ApiConfig";
import Spinner from "../../Components/UI/SpinnerLoading";
import StarRating from "./StartRating";
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/api/reviews/product/5`);
        const resData = await response.json();
        if (!response.ok) {
          console.log(resData);
          setError(resData.message || "faild to fetch reviews");
        }
        console.log(resData);
        setReviews(resData);
      } catch (err) {
        setError(err.message || "faild to fetch reviews");
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error">
        {t(error) || t("An error occurred while fetching the product.")}
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div id="reviews" className="tab-content pt-5">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
          <div className="ratings-main">
            <div className="avg-rating d-flex-center mb-3">
              <h4 className="avg-mark">{averageRating}</h4>
              <div className="avg-content ms-3">
                <p className="text-rating">Average Rating</p>
                <div className="ratings-full product-review">
                  <a className="reviewLink d-flex-center" href="#reviews">
                    <StarRating rating={averageRating} />
                    <span className="caption ms-1">
                      {reviews.length ?? ""} Reviews
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="spr-reviews">
            <div className="spr-form-title main-title-2 mb-4">
              Customer Reviews
            </div>
            {reviews.map((review, i) => (
              <div className="spr-review d-flex w-100" key={i}>
                <div className="spr-review-profile flex-shrink-0">
                  <img
                    className="blur-up lazyload"
                    src={imgMan}
                    // src={review.customer.avatar}
                    alt="User"
                    width="200"
                    height="200"
                  />
                </div>
                <div className="spr-review-content flex-grow-1">
                  <div className="d-flex justify-content-between flex-column mb-2">
                    <div className="title-review d-flex align-items-center justify-content-between">
                      <h5 className="name-person text-transform-none mb-0">
                        {review.customer.full_name}
                      </h5>
                      <span className="product-review spr-starratings m-0">
                        <span className="reviewLink">
                          <StarRating rating={review.rating} />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="desc-content">{review.review_text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
