import React, { useState } from "react";

// Importing all images
import imgOne from "../../assets/images/products/product1-1.jpg";
import imgNavy from "../../assets/images/products/product1.jpg";
import imgGreen from "../../assets/images/products/product1-1.jpg";
import imgGray from "../../assets/images/products/product1-2.jpg";
import imgOrange from "../../assets/images/products/product1-3.jpg";

const ProductGrid = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Oxford Cuban Shirt",
      oldPrice: "$114.00",
      newPrice: "$99.00",
      imageUrl: imgOne, // الصورة الافتراضية
      colors: [
        { title: "Navy", imgSrc: imgNavy },
        { title: "Green", imgSrc: imgGreen },
        { title: "Gray", imgSrc: imgGray },
        { title: "Orange", imgSrc: imgOrange },
      ],
      reviews: 3,
    },
    {
      id: 2,
      name: "Oxford Cuban Shirt",
      oldPrice: "$114.00",
      newPrice: "$99.00",
      imageUrl: imgOne, // الصورة الافتراضية
      colors: [
        { title: "Navy", imgSrc: imgNavy },
        { title: "Green", imgSrc: imgGreen },
        { title: "Gray", imgSrc: imgGray },
        { title: "Orange", imgSrc: imgOrange },
      ],
      reviews: 3,
    },
    {
      id: 3,
      name: "Oxford Cuban Shirt",
      oldPrice: "$114.00",
      newPrice: "$99.00",
      imageUrl: imgOne, // الصورة الافتراضية
      colors: [
        { title: "Navy", imgSrc: imgNavy },
        { title: "Green", imgSrc: imgGreen },
        { title: "Gray", imgSrc: imgGray },
        { title: "Orange", imgSrc: imgOrange },
      ],
      reviews: 3,
    },
    {
      id: 4,
      name: "Oxford Cuban Shirt",
      oldPrice: "$114.00",
      newPrice: "$99.00",
      imageUrl: imgOne, // الصورة الافتراضية
      colors: [
        { title: "Navy", imgSrc: imgNavy },
        { title: "Green", imgSrc: imgGreen },
        { title: "Gray", imgSrc: imgGray },
        { title: "Orange", imgSrc: imgOrange },
      ],
      reviews: 3,
    },
  ]);

  // دالة لتغيير الصورة عند اختيار اللون
  const handleColorChange = (productId, imgSrc) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, imageUrl: imgSrc } // تغيير الصورة فقط لهذا المنتج
          : product
      )
    );
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const itemExists = existingCart.find((item) => item.id === product.id);
    if (itemExists) {
      alert("هذا المنتج موجود بالفعل في السلة");
      return;
    }

    const numericPrice = parseFloat(product.newPrice.replace("$", ""));

    const updatedCart = [
      ...existingCart,
      {
        ...product,
        price: numericPrice, // أضف السعر كرقم
        image: product.imageUrl, // أضف المفتاح image هنا ليتعرف عليه الكارت
        quantity: 1,
      },
    ];

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("✅ تم إضافة المنتج إلى السلة");
  };

  return (
    <div className="grid-products grid-view-items">
      <div className="row col-row product-options row-cols-lg-4 row-cols-md-3 row-cols-sm-3 row-cols-2">
        {products.map((product) => (
          <div className="item col-item" key={product.id}>
            <div className="product-box">
              <div className="product-image">
                <a
                  href="product-layout1.html"
                  className="product-img rounded-3"
                >
                  <img
                    className="blur-up lazyload"
                    src={product.imageUrl} // عرض الصورة المختارة
                    alt={product.name}
                    title={product.name}
                    width="625"
                    height="808"
                  />
                </a>
                <div className="product-labels">
                  <span className="lbl on-sale">Sale</span>
                </div>
                <div className="saleTime" data-countdown="2025/01/01"></div>
                <div className="button-set style1">
                  <button
                    className="btn-icon addtocart"
                    onClick={() => addToCart(product)}
                    title="Add to Cart"
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                    <span className="text">Add to Cart</span>
                  </button>

                  <a
                    href="#quickview-modal"
                    className="btn-icon quickview quick-view-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#quickview_modal"
                  >
                    <span
                      className="icon-wrap d-flex-justify-center h-100 w-100"
                      data-bs-toggle="tooltip"
                      data-bs-placement="left"
                      title="Quick View"
                    >
                      <i className="fa-solid fa-eye"></i>
                      <span className="text">Quick View</span>
                    </span>
                  </a>
                  <a
                    href="wishlist-style2.html"
                    className="btn-icon wishlist"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Add To Wishlist"
                  >
                    <i className="fa-solid fa-heart"></i>
                    <span className="text">Add To Wishlist</span>
                  </a>
                  <a
                    href="compare-style2.html"
                    className="btn-icon compare"
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="Add to Compare"
                  >
                    <i className="fa-solid fa-code-compare"></i>
                    <span className="text">Add to Compare</span>
                  </a>
                </div>
              </div>

              <div className="product-details">
                <div className="product-name">
                  <a href="product-layout1.html">{product.name}</a>
                </div>
                <div className="product-price">
                  <span className="price old-price">{product.oldPrice}</span>
                  <span className="price">{product.newPrice}</span>
                </div>
                <div className="product-review">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < product.reviews ? "active" : "inactive"
                      }`}
                      style={{
                        color: i < product.reviews ? "gold" : "gray",
                      }}
                    ></i>
                  ))}
                  <span className="caption hidden ms-1">
                    {product.reviews} Reviews
                  </span>
                </div>
                <ul className="variants-clr swatches">
                  {product.colors.map((color, index) => (
                    <li
                      className="swatch medium radius"
                      key={index}
                      onClick={() =>
                        handleColorChange(product.id, color.imgSrc)
                      } // عند النقر تغيير الصورة
                    >
                      <span
                        className="swatchLbl"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={color.title}
                      >
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
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
