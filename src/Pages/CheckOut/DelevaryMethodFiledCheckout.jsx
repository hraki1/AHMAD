import { useContext, useEffect, useState } from "react";
import useCountriesData from "../Hooks/useCountriesData";
import { baseUrl } from "../API/ApiConfig";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/UI/SpinnerLoading";
import toast, { Toaster } from "react-hot-toast";

export default function DelevaryFiledCheckout({
  country,
  onSelectDelevaryMethod,
}) {
  const { user, isLoading: authIsLoading } = useContext(AuthContext);

  const userInformation = { ...user };

  const { countries, loading, error } = useCountriesData();
  const [errors, setErrors] = useState({});
  const [cartId, setCartId] = useState(null);
  const [discount, setDiscount] = useState(0); // Check this initial value
  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: userInformation?.full_name ?? "",
    phoneNumber: userInformation?.phone_number ?? "",
    addressOne: "",
    addressTwo: "",
    postCode: "",
    country: country,
    city: "",
    savingAddress: false,
    couponCode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${baseUrl}/api/carts/customer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch cart");
          return res.json();
        })
        .then((data) => {
          setCartId(data.cart_id);
          setDiscount(data.discount_amount || 0); // <-- Set discount from API
          const items = data.items.map((item) => ({
            id: item.product_id,
            cart_item_id: item.cart_item_id,
            name: item.product_name || `Product ${item.product_id}`,
            price: item.product_price || 0,
            quantity: item.qty || 1,
            image: item.image || "default-image.jpg",
          }));
          setCartItems(items);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        });
    }
  }, []);

  function selectDelevaryMethodHandler(payMethod) {
    console.log(payMethod.method_id);
    onSelectDelevaryMethod(payMethod.method_id);
  }

  if (loading || authIsLoading)
    return (
      <div className="h">
        <Spinner />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="block mb-3 shipping-address mb-4">
      <div className="block-content">
        <fieldset>
          <div className="row">
            <div className="form-group col-12 col-sm-6">
              <label htmlFor="address_State" className="form-label">
                Shipping Method <span className="required">*</span>
              </label>
              <select
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={(e) => {
                  const selectedMethod =
                    country?.ShippingZone?.[0]?.zone_methods?.find(
                      (method) => method.method.name === e.target.value
                    );

                  if (selectedMethod) {
                    selectDelevaryMethodHandler(selectedMethod);
                  }
                }}
                className="form-control"
                required
              >
                <option value="">Select Shipping Method</option>
                {country?.ShippingZone?.[0]?.zone_methods
                  ?.filter((method) => method.is_enabled)
                  .map((method) => (
                    <option
                      key={method.shipping_zone_method_id}
                      value={method.method.name}
                    >
                      {method.method.name} - {method.cost}{" "}
                      {country?.currency?.code || "JOD"}
                    </option>
                  ))}
              </select>

              {errors.deliveryMethod && (
                <small className="text-danger">{errors.deliveryMethod}</small>
              )}
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
