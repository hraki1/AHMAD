import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Button, Form } from "react-bootstrap";
import useFetchOneProductById from "../Hooks/useFetchOneProductById";
import Spinner from "../../Components/UI/SpinnerLoading";
import Modal from "../../Components/UI/Modal";
import { baseUrl } from "../API/ApiConfig";

const OrderProduct = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useFetchOneProductById(item.product_id);

  const toggleDetails = () => setIsOpen(!isOpen);

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("Submitted Review:", {
      product_id: item.product_id,
      rating,
      review_text: comment,
    });
    // Reset form

    const data = {
      product_id: item.product_id,
      rating,
      review_text: comment,
    };

    const fetchAddReview = async () => {
      const token = localStorage.getItem("token"); // get the token from localStorage
      try {
        const response = await fetch(`${baseUrl}/api/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // add the token here
          },
          body: JSON.stringify({
            product_id: 2,
            rating: 4,
            review_text: comment,
          }), // send review data
        });

        if (!response.ok) {
          throw new Error("Failed to submit review");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error adding review:", error);
        throw error;
      }
    };

    fetchAddReview();
    toggleDetails();

    setRating(0);
    setComment("");
  };

  useEffect(() => {
    console.log(product);
  }, []);

  console.log(item);
  console.log(product);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>could not fetch product</div>;
  }

  return (
    <>
      {/* Summary Row */}
      <tr className="align-middle">
        <td>
          <img src={product.images[0].origin_image} alt="" width="100" />
        </td>
        <td>{item.product_name}</td>
        <td>{item.qty}</td>
        <td>${item.final_price.toFixed(2)}</td>
        <td>
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-1"
            onClick={toggleDetails}
            style={{
              borderRadius: "20px",
              padding: "6px 12px",
              fontWeight: "500",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} color="#ffc107" fill="#ffc107" />
            ))}
            <span style={{ marginLeft: "5px" }}>Review</span>
          </Button>
        </td>
      </tr>

      {/* Details Row */}
      {/* Modal with Review Form */}
      <Modal open={isOpen}>
        <div className="pt-3">
          <h6 className="mb-3 text-light fs-4">Leave a Review</h6>
          <div className="d-flex align-items-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                color={(hoveredStar || rating) >= star ? "#ffc107" : "#e4e5e9"}
                fill={(hoveredStar || rating) >= star ? "#ffc107" : "none"}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => handleStarClick(star)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
            ))}
          </div>
          <Form onSubmit={handleSubmitReview}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-3">
              <Button variant="primary" type="submit">
                Submit Review
              </Button>
              <Button variant="secondary" onClick={toggleDetails}>
                Close
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      <AnimatePresence>
        {isOpen && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <td colSpan={4}>
              <div className="p-3 border rounded bg-light">
                {/* Product Details */}
                <div className="mb-2">
                  <strong>Product Name:</strong> {item.product_name}
                </div>
                <div className="mb-2">
                  <strong>SKU:</strong> {item.product_sku}
                </div>
                <div className="mb-2">
                  <strong>Quantity:</strong> {item.qty}
                </div>
                <div className="mb-2">
                  <strong>Price (per unit):</strong> $
                  {item.product_price.toFixed(2)}
                </div>
                <div className="mb-3">
                  <strong>Weight:</strong> {item.product_weight} kg
                </div>

                {/* Review Section */}
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderProduct;
