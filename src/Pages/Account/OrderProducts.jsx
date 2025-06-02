import { useMemo } from "react";
import OrderProduct from "./OrderProduct";
import { useTranslation } from "react-i18next";
import Order from "./Order";
const OrderProducts = ({ orders }) => {
  const { t } = useTranslation();

  if (orders.length === 0) {
    return <div>{t(`Account.no_orders`)}</div>;
  }
  console.log("products");

  const mergedItems = useMemo(() => {
    const allItems = orders.flatMap((order) => order.items);
    return allItems.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.product_id === item.product_id);
      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
  }, [orders]);

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
              <th>{t(`checkOut.full_name`)}</th>
              <th>{t(`Quantity`)}</th>
              <th>{t(`Total`)}</th>
            </tr>
          </thead>
          <tbody>
            {mergedItems.map((item, index) => (
              <OrderProduct key={item.product_id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProducts;
