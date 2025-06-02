import React, { useEffect, useState, useCallback } from "react";
import { Star } from "lucide-react";
import { Button, Form, Alert } from "react-bootstrap";
import useFetchOneProductById from "../Hooks/useFetchOneProductById";
import Spinner from "../../Components/UI/SpinnerLoading";
import Modal from "../../Components/UI/Modal";
import { baseUrl } from "../API/ApiConfig";
import StarRating from "./StartRating"; // New reusable component
import { useTranslation } from "react-i18next";
const OrderProduct = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewState, setReviewState] = useState({
    isReviewed: false,
    reviewData: null,
    isLoading: false,
    error: null,
  });
  const [submitState, setSubmitState] = useState({
    isLoading: false,
    error: null,
    success: false,
  });

  const [product, setProduct] = useState();
  const [loading, setIsLoading] = useState();
  const [error, setError] = useState();

  const { t } = useTranslation();
  // console.log(reviewState.reviewData);

  const toggleDetails = () => setIsOpen(!isOpen);

  const handleStarClick = (index) => setRating(index);

  useEffect(() => {
    setIsLoading(true);
    const fetchReviewedProduct = async () => {
      const token = localStorage.getItem("token");
      setReviewState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch(
          `${baseUrl}/api/reviews/product/${item.product_id}/customer`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const productResponse = await fetch(
          `${baseUrl}/api/products/${item.product_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const resData = await response.json();
        const productData = await productResponse.json();
        console.log(productData);

        if (!response.ok) {
          throw new Error("Failed to fetch review data");
        }
        if (!productResponse.ok) {
          throw new Error("Failed to fetch review data");
        }

        console.log(productData.data[0]);
        setProduct(productData.data[0]);
        setReviewState({
          isReviewed: resData.length > 0,
          reviewData: resData[0] || null,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setReviewState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        console.error("Error fetching reviewed product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (item.product_id) {
      fetchReviewedProduct();
    }
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      setSubmitState({
        isLoading: false,
        error: "Please select a rating",
        success: false,
      });
      return;
    }

    setSubmitState({ isLoading: true, error: null, success: false });

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${baseUrl}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: item.product_id,
          rating,
          review_text: comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit review");
      }

      const resData = await response.json();

      setReviewState({
        isReviewed: true,
        reviewData: resData,
        isLoading: false,
        error: null,
      });

      setSubmitState({ isLoading: false, error: null, success: true });

      // Reset form and close modal after 1 second
      setTimeout(() => {
        setRating(0);
        setComment("");
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      setSubmitState({
        isLoading: false,
        error: error.message,
        success: false,
      });
      console.error("Error adding review:", error);
    }
  };


  if (error) {
    return <Alert variant="danger">Could not fetch product: {error}</Alert>;
  }

  return (
    <>
      <tr className="align-middle">
        <td>
          {product ? (
            <img
              src={
                product.images[0]?.origin_image || "/placeholder-product.png"
              }
              alt={item.product_name}
              width="100"
              onError={(e) => {
                e.target.src = "/placeholder-product.png";
              }}
            />
          ) : (
            <Spinner />
          )}
        </td>
        <td>{item.product_name}</td>
        <td>{item.qty}</td>
        <td>${item.final_price.toFixed(2)}</td>
        <td>
          {reviewState.isLoading ? (
            <Spinner size="sm" />
          ) : reviewState.isReviewed ? (
            <div className="d-flex align-items-center gap-1">
              <StarRating
                rating={reviewState.reviewData?.rating || 0}
                interactive={false}
              />
              <span className="ms-2">{t(`Account.Reviewed`)}</span>
            </div>
          ) : (
            <Button
              variant="outline-primary"
              className="d-flex align-items-center gap-1"
              onClick={toggleDetails}
              disabled={reviewState.isLoading}
              style={{
                borderRadius: "20px",
                padding: "6px 12px",
                fontWeight: "500",
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} color="#ccc" fill="none" />
              ))}
              <span style={{ marginLeft: "5px" }}>{t(`Reviews`)}</span>
            </Button>
          )}
        </td>
      </tr>

      <Modal open={isOpen} onClose={toggleDetails}>
        <div className="p-3">
          <h5 className="mb-3 text-white">
            {t(`Account.Leave_Review`)} {item.product_name}
          </h5>

          {submitState.success && (
            <Alert variant="success" className="mb-3">
              {t(`Account.Thank_review`)}
            </Alert>
          )}

          {submitState.error && (
            <Alert variant="danger" className="mb-3">
              {submitState.error}
            </Alert>
          )}

          <div className="mb-3">
            <label className="d-block mb-2">{t(`Account.Rating`)}</label>
            <StarRating
              rating={hoveredStar || rating}
              onRatingChange={{ setHoveredStar, handleStarClick }}
              size={24}
            />
          </div>

          <Form onSubmit={handleSubmitReview}>
            <Form.Group className="mb-3">
              <Form.Label>{t(`Account.Your_Review`)}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
              <div className="text-end text-muted small mt-1">
                {comment.length}/500 {t(`Account.characters`)}
              </div>
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                variant="primary"
                type="submit"
                disabled={submitState.isLoading}
              >
                {submitState.isLoading
                  ? t(`Account.Submitting`)
                  : t(`Account.Submit_Review`)}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={toggleDetails}
                disabled={submitState.isLoading}
              >
                {t(`Cancel`)}
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default OrderProduct;
