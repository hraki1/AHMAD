import React from "react";
import imgwill from "../../assets/images/products/product4.jpg";
const wishlistItems = [
  {
    id: "#12301",
    name: "Oxford Cuban Shirt",
    price: "$99.00",
    image: imgwill,
  },
  {
    id: "#12302",
    name: "Cuff Beanie Cap",
    price: "$128.00",
    image: imgwill,
  },
  {
    id: "#12303",
    name: "Flannel Collar Shirt",
    price: "$114.00",
    image: imgwill,
  },
  {
    id: "#12304",
    name: "Cotton Hooded Hoodie",
    price: "$198.00",
    image: imgwill,
  },
];

const Wishlist = () => {
  return (
    <div className="h-100" id="wishlist">
      <div className="orders-card mt-0 h-100">
        <div className="top-sec d-flex justify-content-between mb-4">
          <div className="title-account mb-0">My Wishlist</div>
        </div>

        <div className="table-bottom-brd table-responsive">
          <table className="table align-middle text-center order-table">
            <thead>
              <tr className="table-head text-nowrap">
                <th scope="col">Image</th>
                <th scope="col">Order Id</th>
                <th scope="col">Product Details</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="blur-up lazyload"
                      src={item.image}
                      alt={item.name}
                      width="50"
                    />
                  </td>
                  <td>
                    <span className="id">{item.id}</span>
                  </td>
                  <td>
                    <span className="name">{item.name}</span>
                  </td>
                  <td>
                    <span className="price fw-500">{item.price}</span>
                  </td>
                  <td>
                    <a
                      href="cart-style1.html"
                      className="btn btn-md text-nowrap"
                    >
                      Add to Cart
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
