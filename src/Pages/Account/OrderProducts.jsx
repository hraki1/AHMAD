import OrderProduct from "./Orderproduct";
const OrderProducts = ({ orders }) => {
  if (orders.length === 0) {
    return <div>there is not orders</div>;
  }
  const allItems = orders.flatMap((order) => order.items);

  console.log("allItems", allItems);
  return (
    <div className="orders-card mt-0 h-100">
      <div className="top-sec d-flex-justify-center justify-content-between mb-4">
        <div className="title-account mb-0">My Orders</div>
      </div>

      <div className="table-bottom-brd table-responsive">
        <table className="table align-middle text-center order-table">
          <thead>
            <tr className="table-head text-nowrap">
              <th></th>
              <th>User Email</th>
              <th>Quantyty</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <OrderProduct key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProducts;
