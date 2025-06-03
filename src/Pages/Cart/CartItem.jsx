import { useEffect, useState } from "react";

import Modal from "../../Components/UI/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function CartItem({
  itemId,
  image,
  name,
  price,
  quantity,
  isLoading,
  onUpdatedQuantity,
  onRemove,
  isLoadingDelete,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoadingDelete) {
      setModalOpen(false);
    }
  }, [isLoadingDelete]);

  function onPlusHandler() {
    onUpdatedQuantity(itemId, quantity + 1);
  }

  function onMinusHandler() {
    if (quantity === 1) {
      setModalOpen(true);
    } else {
      onUpdatedQuantity(itemId, quantity - 1);
    }
  }
  const { t } = useTranslation();
  return (
    <>
      <Modal open={modalOpen}>
        <div className="p-4 text-center">
          <h2 className="h4 fw-bold text-white">
            {t(`Remove`)} <strong className="text-danger">{name}</strong>{" "}
            {t(`from_your_cart`)}
          </h2>
          <p className="desc">{t(`This_permanently`)}</p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={() => {
                onRemove(itemId);
              }}
              className="btn btn-secondary px-4 btn-one-hover-shipp"
            >
              {(isLoadingDelete ? "Deleting..." : t(`Yes`), t(`Remove`))}
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="btn btn-primary px-4 btn-tow-hover-shipp"
            >
              {t(`Cancel`)}
            </button>
          </div>
        </div>
      </Modal>

      <tr key={itemId}>
        <td className="text-center">
          <button
            className="btn btn-link text-danger"
            onClick={() => setModalOpen(true)}
            disabled={isLoading}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </td>
        <td>
          <Link>
            {" "}
            <img
              src={image}
              alt={name}
              style={{ width: 80, height: "auto" }}
              className="img-thumbnail"
            />
          </Link>
        </td>
        <td>{name}</td>
        <td className="text-center">${price.toFixed(2)}</td>
        <td className="text-center min-plu-cart">
          <button
            onClick={onMinusHandler}
            className="btn btn-outline-secondary"
            disabled={isLoading}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          {console.log(quantity)}
          <span className="mx-2">{quantity}</span>
          <button
            onClick={onPlusHandler}
            className={`btn btn-outline-secondary ${
              isLoading && "cursor-wait"
            }`}
            disabled={isLoading}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </td>
        <td className="text-center fw-bold">
          ${(price * quantity).toFixed(2)}
        </td>
      </tr>
    </>
  );
}
