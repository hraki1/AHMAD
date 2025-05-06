import postImg1 from "../../assets/images/blog/post-img1.jpg";
import postImg2 from "../../assets/images/blog/post-img2.jpg";
import postImg3 from "../../assets/images/blog/post-img3.jpg";

// For Popular Categories
import img1 from "../../assets/images/collection/sub-collection1.jpg";
import img2 from "../../assets/images/collection/sub-collection3.jpg";
import img3 from "../../assets/images/collection/sub-collection5.jpg";
import img4 from "../../assets/images/collection/sub-collection6.jpg";
import img5 from "../../assets/images/collection/sub-collection9.jpg";
import img6 from "../../assets/images/collection/sub-collection2.jpg";
import img7 from "../../assets/images/collection/sub-collection4.jpg";

import product1 from "../../assets/images/products/product1.jpg";
import product1_1 from "../../assets/images/products/product1-1.jpg";
import product1_2 from "../../assets/images/products/product1-2.jpg";
import product1_3 from "../../assets/images/products/product1-3.jpg";

import product2 from "../../assets/images/products/product2.jpg";
import product2_1 from "../../assets/images/products/product2-1.jpg";
import product2_2 from "../../assets/images/products/product2-2.jpg";
import product2_3 from "../../assets/images/products/product2-3.jpg";
import product2_4 from "../../assets/images/products/product2-4.jpg";
import product2_5 from "../../assets/images/products/product2-5.jpg";

import product3 from "../../assets/images/products/product3.jpg";
import product3_1 from "../../assets/images/products/product3-1.jpg";

import product4 from "../../assets/images/products/product4.jpg";
import product4_1 from "../../assets/images/products/product4-1.jpg";

import product5 from "../../assets/images/products/product5.jpg";
import product5_1 from "../../assets/images/products/product5-1.jpg";

import product6 from "../../assets/images/products/product6.jpg";
import product6_1 from "../../assets/images/products/product6-1.jpg";

import product7 from "../../assets/images/products/product7.jpg";
import product7_1 from "../../assets/images/products/product7-1.jpg";

import product8 from "../../assets/images/products/product8.jpg";
import product8_1 from "../../assets/images/products/product8-1.jpg";

import product9 from "../../assets/images/products/product9.jpg";
import product9_1 from "../../assets/images/products/product9-1.jpg";

import product10 from "../../assets/images/products/product10.jpg";
import product10_1 from "../../assets/images/products/product10-1.jpg";

import product11 from "../../assets/images/products/product11.jpg";
import product11_1 from "../../assets/images/products/product11-1.jpg";

import product12 from "../../assets/images/products/product12.jpg";
import product12_1 from "../../assets/images/products/product12-1.jpg";

import product13 from "../../assets/images/products/product13.jpg";
import product13_1 from "../../assets/images/products/product13-1.jpg";

import product14 from "../../assets/images/products/product14.jpg";
import product14_1 from "../../assets/images/products/product14-1.jpg";

import product15 from "../../assets/images/products/product15.jpg";
import product15_1 from "../../assets/images/products/product15-1.jpg";

// slide show
// Images
import banner1Desktop from "../../assets/images/slideshow/demo1-banner1.jpg";
import banner2Desktop from "../../assets/images/slideshow/demo1-banner2.jpg";
import banner3Desktop from "../../assets/images/slideshow/demo1-banner3.jpg";
import banner1Mobile from "../../assets/images/slideshow/demo1-banner1-mbl.jpg";
import banner2Mobile from "../../assets/images/slideshow/demo1-banner2-mbl.jpg";
import banner3Mobile from "../../assets/images/slideshow/demo1-banner3-mbl.jpg";

// For Testimonial Section Componet
import testimonial1 from "../../assets/images/users/testimonial1-65x.jpg";
import testimonial2 from "../../assets/images/users/testimonial2-65x.jpg";
import testimonial3 from "../../assets/images/users/testimonial3-65x.jpg";
import testimonial4 from "../../assets/images/users/testimonial4-65x.jpg";

// FOR SERVICES SECTION
export const services = [
  {
    icon: "fa-solid fa-phone",
    title: "Call us any time",
    subtitle: "Contact us 24/7 hours a day",
  },
  {
    icon: "fa-solid fa-truck",
    title: "Pickup At Any Store",
    subtitle: "Free shipping on orders over $65",
  },
  {
    icon: "fa-solid fa-credit-card",
    title: "Secured Payment",
    subtitle: "We accept all major credit cards",
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Free Returns",
    subtitle: "30-days free return policy",
  },
];

// For Category Popular Collections
export const categoriesData = [
  { img: img1, title: "Men's Jakets", count: 20 },
  { img: img2, title: "Tops", count: 13 },
  { img: img3, title: "T‑Shirts", count: 18 },
  { img: img4, title: "Shoes", count: 11 },
  { img: img5, title: "Shorts", count: 28 },
  { img: img6, title: "Sunglasses", count: 24 },
  { img: img7, title: "Girls Top", count: 26 },
];

// بيانات المنتجات على شكل مصفوفة لكل تاب
export const productsData = {
  bestsellers: [
    {
      id: 1,
      primaryImg: product1,
      hoverImg: product11_1,
      name: "Oxford Cuban Shirt",
      priceOld: 114,
      price: 99,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Sale", className: "on-sale" }],
      countdown: "2025/01/01",
      variants: [
        { src: product1, title: "Navy" },
        { src: product1_1, title: "Green" },
        { src: product1_2, title: "Gray" },
        { src: product1_3, title: "Orange" },
      ],
      buttonLinks: {
        cart: {
          href: "#quickshop-modal",
          className: "addtocart quick-shop-modal",
          modal: "#quickshop_modal",
          title: "Quick Shop",
          text: "Quick Shop",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 2,
      primaryImg: product2,
      hoverImg: product2_2,
      name: "Cuff Beanie Cap",
      price: 128,
      reviewsCount: 3,
      rating: 5,
      href: "product-layout1.html",
      variants: [
        { src: product2, title: "Navy" },
        { src: product2_1, title: "Green" },
        { src: product2_2, title: "Gray" },
        { src: product2_3, title: "Orange" },
        { src: product2_4, title: "Yellow" },
        { src: product2_5, title: "Blue" },
      ],
      buttonLinks: {
        cart: {
          href: "#quickshop-modal",
          className: "addtocart quick-shop-modal",
          modal: "#quickshop_modal",
          title: "Select Options",
          text: "Select Options",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 3,
      primaryImg: product3,
      hoverImg: product3_1,
      name: "Flannel Collar Shirt",
      price: 99,
      reviewsCount: 3,
      rating: 3,
      href: "product-layout1.html",
      labels: [{ text: "New", className: "pr-label3" }],
      variants: [
        { className: "red", title: "red" },
        { className: "orange", title: "orange" },
        { className: "yellow", title: "yellow" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 4,
      primaryImg: product4,
      hoverImg: product4_1,
      name: "Cotton Hooded Hoodie",
      priceOld: 198,
      price: 99,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "50% Off", className: "on-sale" }],
      availability: 75, // 75%
      sold: 34,
      available: 16,
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 5,
      primaryImg: product5,
      hoverImg: product5_1,
      name: "Hooded Neck Hoodies",
      price: 39,
      reviewsCount: 3,
      rating: 4.5,
      href: "product-layout1.html",
      labels: [{ text: "Hot", className: "pr-label2" }],
      variants: [
        { className: "black", title: "black" },
        { className: "maroon", title: "maroon" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 6,
      primaryImg: product6,
      hoverImg: product6_1,
      name: "Foldable Duffel Bag",
      price: 299,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Sold out", className: "on-sale" }],
      variants: [
        { className: "gray", title: "gray" },
        { className: "red", title: "red" },
        { className: "orange", title: "orange" },
        { className: "yellow", title: "yellow" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 7,
      primaryImg: product7,
      hoverImg: product7_1,
      name: "High-Waisted Pant",
      price: 139,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Best seller", className: "pr-label1" }],
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 8,
      primaryImg: product8,
      hoverImg: product8_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 0,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
  ],
  newarrivals: [
    // يمكنك وضع بيانات المنتجات الجديدة هنا بنفس البنية
    {
      id: 21,
      primaryImg: product8,
      hoverImg: product8_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 22,
      primaryImg: product9,
      hoverImg: product9_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 23,
      primaryImg: product10,
      hoverImg: product10_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 24,
      primaryImg: product11,
      hoverImg: product11_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 25,
      primaryImg: product12,
      hoverImg: product12_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 26,
      primaryImg: product13,
      hoverImg: product13_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 27,
      primaryImg: product14,
      hoverImg: product14_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 28,
      primaryImg: product15,
      hoverImg: product15_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    // ... المزيد من المنتجات الجديدة
  ],
  toprated: [
    {
      id: 1,
      primaryImg: product1,
      hoverImg: product11_1,
      name: "Oxford Cuban Shirt",
      priceOld: 114,
      price: 99,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Sale", className: "on-sale" }],
      countdown: "2025/01/01",
      variants: [
        { src: product1, title: "Navy" },
        { src: product1_1, title: "Green" },
        { src: product1_2, title: "Gray" },
        { src: product1_3, title: "Orange" },
      ],
      buttonLinks: {
        cart: {
          href: "#quickshop-modal",
          className: "addtocart quick-shop-modal",
          modal: "#quickshop_modal",
          title: "Quick Shop",
          text: "Quick Shop",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 2,
      primaryImg: product2,
      hoverImg: product2_2,
      name: "Cuff Beanie Cap",
      price: 128,
      reviewsCount: 3,
      rating: 5,
      href: "product-layout1.html",
      variants: [
        { src: product2, title: "Navy" },
        { src: product2_1, title: "Green" },
        { src: product2_2, title: "Gray" },
        { src: product2_3, title: "Orange" },
        { src: product2_4, title: "Yellow" },
        { src: product2_5, title: "Blue" },
      ],
      buttonLinks: {
        cart: {
          href: "#quickshop-modal",
          className: "addtocart quick-shop-modal",
          modal: "#quickshop_modal",
          title: "Select Options",
          text: "Select Options",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 3,
      primaryImg: product3,
      hoverImg: product3_1,
      name: "Flannel Collar Shirt",
      price: 99,
      reviewsCount: 3,
      rating: 3,
      href: "product-layout1.html",
      labels: [{ text: "New", className: "pr-label3" }],
      variants: [
        { className: "red", title: "red" },
        { className: "orange", title: "orange" },
        { className: "yellow", title: "yellow" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 4,
      primaryImg: product4,
      hoverImg: product4_1,
      name: "Cotton Hooded Hoodie",
      priceOld: 198,
      price: 99,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "50% Off", className: "on-sale" }],
      availability: 75, // 75%
      sold: 34,
      available: 16,
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 5,
      primaryImg: product5,
      hoverImg: product5_1,
      name: "Hooded Neck Hoodies",
      price: 39,
      reviewsCount: 3,
      rating: 4.5,
      href: "product-layout1.html",
      labels: [{ text: "Hot", className: "pr-label2" }],
      variants: [
        { className: "black", title: "black" },
        { className: "maroon", title: "maroon" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 6,
      primaryImg: product6,
      hoverImg: product6_1,
      name: "Foldable Duffel Bag",
      price: 299,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Sold out", className: "on-sale" }],
      variants: [
        { className: "gray", title: "gray" },
        { className: "red", title: "red" },
        { className: "orange", title: "orange" },
        { className: "yellow", title: "yellow" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 7,
      primaryImg: product7,
      hoverImg: product7_1,
      name: "High-Waisted Pant",
      price: 139,
      reviewsCount: 3,
      rating: 4,
      href: "product-layout1.html",
      labels: [{ text: "Best seller", className: "pr-label1" }],
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
    {
      id: 8,
      primaryImg: product8,
      hoverImg: product8_1,
      name: "Narror Neck Tie",
      price: 134,
      reviewsCount: 0,
      rating: 4,
      href: "product-layout1.html",
      variants: [
        { className: "black", title: "black" },
        { className: "navy", title: "navy" },
        { className: "darkgreen", title: "darkgreen" },
      ],
      buttonLinks: {
        cart: {
          href: "#addtocart-modal",
          className: "addtocart add-to-cart-modal",
          modal: "#addtocart_modal",
          title: "Add to Cart",
        },
        quickView: {
          href: "#quickview-modal",
          className: "quickview quick-view-modal",
          modal: "#quickview_modal",
          title: "Quick View",
        },
        wishlist: { href: "wishlist-style2.html" },
        compare: { href: "compare-style2.html" },
      },
    },
  ],
};

export const blogPosts = [
  {
    date: "25 Apr 2023",
    title: "New shop collection our shop",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered.",
    img: postImg1,
    link: "blog-details.html",
  },
  {
    date: "31 Mar 2023",
    title: "Gift ideas for everyone",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority suffered.",
    img: postImg2,
    link: "blog-details.html",
  },
  {
    date: "30 Jan 2023",
    title: "Sales with best collection",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority.",
    img: postImg3,
    link: "blog-details.html",
  },
];

// For SlideShow Componetns
export const slides = [
  {
    desktop: banner1Desktop,
    mobile: banner1Mobile,
    subtitle: "Elegant design",
    title: "Making someone feel\npretty is an art",
    caption: "Perfectly designed to ensure ultimate comfort and style",
    position: "middle-left",
    buttons: [
      { label: "Shop Women", href: "/ShopGrid", primary: true },
      { label: "Shop Men", href: "/ShopGrid", primary: false },
    ],
  },
  {
    desktop: banner2Desktop,
    mobile: banner2Mobile,
    subtitle: "",
    title: "Spread Positive\nEnergy With Hema",
    caption: "The must-have closet essential women wardrobe for the year",
    position: "middle-right",
    buttons: [{ label: "Explore Now!", href: "/ShopGrid", primary: true }],
  },
  {
    desktop: banner3Desktop,
    mobile: banner3Mobile,
    subtitle: "",
    title: "Design Your Next\nFavourite Wear",
    caption: "The outfit that blend elegance and style for your casual wear",
    position: "middle-right",
    buttons: [{ label: "Shop now", href: "/ShopGrid", primary: true }],
  },
];

// For Testimonial Section Componet
export const testimonials = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    reviews: "24 Reviews",
    stars: 4,
    img: testimonial1,
  },
  {
    name: "Jessica Doe",
    role: "Marketing",
    reviews: "15 Reviews",
    stars: 5,
    img: testimonial2,
  },
  {
    name: "Rick Edward",
    role: "Developer",
    reviews: "17 Reviews",
    stars: 2,
    img: testimonial3,
  },
  {
    name: "Happy Buyer",
    role: "Designer",
    reviews: "29 Reviews",
    stars: 4,
    img: testimonial4,
  },
];
