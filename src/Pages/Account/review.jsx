<div className="card mb-3 shadow-sm w-100">
  <div
    className={`card-header d-flex justify-content-between align-items-center ${
      isExpanded ? "bg-light" : ""
    }`}
    onClick={toggleExpand}
    style={{ cursor: "pointer" }}
  >
    <div className="d-flex align-items-center gap-3">
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </motion.div>
      <div>
        <h6 className="mb-0">Order #{order.order_number}</h6>
        <small className="text-muted">ID: {order.id}</small>
      </div>
    </div>
    <span className={`badge bg-${statusColor} text-capitalize`}>
      {order.payment_status}
    </span>
  </div>

  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div className="card-body">
          <div className="mb-3">
            <h6>Customer:</h6>
            <p className="mb-0">
              <strong>{order.customer_full_name}</strong> <br />
              <small className="text-muted">{order.customer_email}</small>
            </p>
          </div>

          <h6>Products:</h6>
          <div className="list-group mb-3">
            {order.items.map((item) => (
              <div
                key={item.order_item_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p className="mb-1 fw-medium">{item.product_name}</p>
                  <small className="text-muted">
                    Qty: {item.qty} × {order.currency}
                    {item.product_price.toFixed(2)}
                  </small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold">
                    {order.currency}
                    {(item.qty * item.product_price).toFixed(2)}
                  </span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleOpenReviewModal(item)}
                  >
                    <Star size={16} /> Review
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-top pt-3">
            <div className="d-flex justify-content-between">
              <span>Shipping:</span>
              <span>
                {order.currency} {order.shipping_total || "0.00"}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax:</span>
              <span>
                {order.currency} {order.tax_total || "0.00"}
              </span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2">
              <span>Total:</span>
              <span>
                {order.currency} {order.grand_total}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>;

{
  /* Review Modal */
}
<Modal show={showReviewModal} onHide={handleCloseReviewModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Leave a Review</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>
      <strong>{selectedProduct?.product_name}</strong>
    </p>
    <Form.Group>
      <Form.Label>Your Review</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseReviewModal}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmitReview}>
      Submit Review
    </Button>
  </Modal.Footer>

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
            <div className="border-top pt-3">
              <h6 className="mb-3">Leave a Review</h6>
              <div className="d-flex align-items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    color={
                      (hoveredStar || rating) >= star ? "#ffc107" : "#e4e5e9"
                    }
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
                <Button variant="primary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </div>
          </div>
        </td>
      </motion.tr>
    )}
  </AnimatePresence>
</Modal>;
