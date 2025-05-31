import { Link } from "react-router-dom";

export default function ProductItem({
  product,
  onAddToWishList,
  handleColorChange,
}) {
  const renderStars = (reviews) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star`}
        style={{ color: i < reviews ? "gold" : "gray" }}
      />
    ));

  console.log(product);
  //   console.log(product.id);

  return (
    <div className="item col-item" key={product.id}>
      <div className="product-box">
        <div className="product-image">
          <Link
            to={`/product/${product.url_key}`}
            className="product-img rounded-3"
          >
            <img
              className="blur-up lazyload"
              src={product.imageUrl}
              alt={product.name}
              width="625"
              height="808"
            />
          </Link>
          <div className="product-labels">
            <span className="lbl on-sale">Sale</span>
          </div>
          <div className="button-set style1">
            <Link
              to={`/product/${product.url_key || product.id}`}
              className="btn-icon quickview"
            >
              <i className="fa-solid fa-eye"></i>
              <span className="text">Quick View</span>
            </Link>
            <Link
              href="#"
              className="btn-icon wishlist"
              onClick={(e) => onAddToWishList(e, product)}
            >
              <i className="fa-solid fa-heart"></i>
              <span className="text">Add To Wishlist</span>
            </Link>
            {/* <Link href="compare-style2.html" className="btn-icon compare">
                    <i className="fa-solid fa-code-compare"></i>
                    <span className="text">Add to Compare</span>
                  </Link> */}
          </div>
        </div>

        <div className="product-details">
          <div className="product-name">
            <Link to={`/product/${product.url_key}`}>{product.name}</Link>
          </div>
          <div className="product-price">
            <span className="price old-price">{product.oldPrice}</span>
            <span className="price">{product.newPrice}</span>
          </div>
          <div className="product-review">{renderStars(product.reviews)}</div>
          <ul className="variants-clr swatches">
            {product.colors.map((color, i) => (
              <li
                key={i}
                className="swatch medium radius"
                onClick={() => handleColorChange(product.id, color.imgSrc)}
              >
                <span className="swatchLbl" title={color.title}>
                  <img
                    src={color.imgSrc}
                    alt={color.title}
                    width="625"
                    height="808"
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
