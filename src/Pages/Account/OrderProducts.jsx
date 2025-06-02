import OrderProduct from "./OrderProduct";

const OrderProducts = ({ orders }) => {
  if (orders.length === 0) {
    return <div>There are no orders</div>;
  }

  
  const allItems = orders.flatMap((order) => order.items);

  const mergedItems = allItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.product_id === item.product_id);
    if (existingItem) {
      existingItem.qty += item.qty;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  console.log("mergedItems", mergedItems);

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
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {mergedItems.map((item, index) => (
              <OrderProduct key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProducts;
