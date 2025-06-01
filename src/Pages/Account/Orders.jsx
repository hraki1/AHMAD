import Order from "./Order";
const Orders = ({ orders }) => {
  if (orders.length === 0) {
    return <div>there is not orders</div>;
  }
  // const allItems = orders.flatMap((order) => order.items);

  // console.log("allItems", allItems);
  return (
    <div className="orders-card mt-0 h-100">
      <div className="top-sec d-flex-justify-center justify-content-between mb-4">
        <div className="title-account mb-0">My Orders</div>
      </div>
      <div className="table-bottom-brd table-responsive">
        <table className="table align-middle text-center order-table">
          <thead>
            <tr className="table-head text-nowrap">
              <th>Order ID</th>
              <th>User Email</th>
              <th>Status</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <Order key={index} order={order}></Order>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
