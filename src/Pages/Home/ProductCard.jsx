export default function ProductCard({
  id,
  href = "product-layout1.html",
  primaryImg,
  hoverImg,
  alt = "Product",
  title = "Product",
  labels = [],
  countdown,
  name,
  old_price,
  price,
  reviewsCount,
  rating, // 0-5
  variants = [],
  availability,
  sold,
  available,
  buttonLinks = {},
}) {
  // to show stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <i
            key={i}
            className="fas fa-star"
            style={{ color: "gold" }}
            aria-hidden="true"
          />
        );
      } else {
        stars.push(
          <i
            key={i}
            className="far fa-star"
            style={{ color: "gold" }}
            aria-hidden="true"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="item col-item" key={id}>
      <div className="product-box">
        <div className="product-image">
          <a href={href} className="product-img rounded-3" title={title}>
            <img
              className="primary blur-up lazyload"
              src={primaryImg}
              alt={alt}
              width={625}
              height={808}
              loading="lazy"
            />
            {hoverImg && (
              <img
                className="hover blur-up lazyload"
                src={hoverImg}
                alt={alt}
                width={625}
                height={808}
                loading="lazy"
              />
            )}
          </a>

          {labels.length > 0 && (
            <div className="product-labels">
              {labels.map(({ text, className }, idx) => (
                <span key={idx} className={`lbl ${className}`}>
                  {text}
                </span>
              ))}
            </div>
          )}

          {countdown && <div className="saleTime" data-countdown={countdown} />}

          <div className="button-set style1">
            {/* Cart Button */}
            {buttonLinks.cart && (
              <a
                href={buttonLinks.cart.href}
                className={`btn-icon addtocart ${
                  buttonLinks.cart.className || ""
                }`}
                data-bs-toggle={buttonLinks.cart.modal ? "modal" : undefined}
                data-bs-target={
                  buttonLinks.cart.modal ? buttonLinks.cart.modal : undefined
                }
                title={buttonLinks.cart.title || "Add to Cart"}
              >
                <span className="icon-wrap d-flex-justify-center h-100 w-100">
                  <i className="fa-solid fa-cart-plus" />
                  <span className="text">
                    {buttonLinks.cart.text || "Add to Cart"}
                  </span>
                </span>
              </a>
            )}

            {/* Quick View Button */}
            {buttonLinks.quickView && (
              <a
                href={buttonLinks.quickView.href}
                className={`btn-icon quickview ${
                  buttonLinks.quickView.className || ""
                }`}
                data-bs-toggle={
                  buttonLinks.quickView.modal ? "modal" : undefined
                }
                data-bs-target={
                  buttonLinks.quickView.modal
                    ? buttonLinks.quickView.modal
                    : undefined
                }
                title={buttonLinks.quickView.title || "Quick View"}
              >
                <span className="icon-wrap d-flex-justify-center h-100 w-100">
                  <i className="fa-solid fa-magnifying-glass" />
                  <span className="text">
                    {buttonLinks.quickView.text || "Quick View"}
                  </span>
                </span>
              </a>
            )}

            {/* Wishlist Button */}
            {buttonLinks.wishlist && (
              <a
                href={buttonLinks.wishlist.href}
                className="btn-icon wishlist"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title={buttonLinks.wishlist.title || "Add To Wishlist"}
              >
                <i className="fa-solid fa-heart" />
                <span className="text">
                  {buttonLinks.wishlist.text || "Add To Wishlist"}
                </span>
              </a>
            )}

            {/* Compare Button */}
            {buttonLinks.compare && (
              <a
                href={buttonLinks.compare.href}
                className="btn-icon compare"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title={buttonLinks.compare.title || "Add to Compare"}
              >
                <i className="fa-solid fa-code-compare" />
                <span className="text">
                  {buttonLinks.compare.text || "Add to Compare"}
                </span>
              </a>
            )}
          </div>

          {availability && (
            <div className="product-availability rounded-5">
              <div className="lh-1 d-flex justify-content-between">
                <div className="text-sold">
                  Sold:
                  <strong className="text-primary ms-1">{sold}</strong>
                </div>
                <div className="text-available">
                  Available:
                  <strong className="text-primary ms-1">{available}</strong>
                </div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${availability}%` }}
                  aria-valuenow={availability}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )}
        </div>

        <div className="product-details">
          <div className="product-name">
            <a href={href}>{name}</a>
          </div>
          <div className="product-price">
            {old_price && <span className="price old-price">${old_price}</span>}
            <span className="price">${price}</span>
          </div>
          <div className="product-review">
            {renderStars()}
            <span className="caption hidden ms-1">{reviewsCount} Reviews</span>
          </div>
          {variants.length > 0 && (
            <ul className="variants-clr swatches">
              {variants.map(({ type, src, title, className }, idx) => (
                <li
                  key={idx}
                  className={`swatch medium radius ${className || ""}`}
                >
                  {src ? (
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={title}
                    >
                      <img src={src} alt={title} width={625} height={808} />
                    </span>
                  ) : (
                    <span
                      className="swatchLbl"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={title}
                      aria-label={title}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
