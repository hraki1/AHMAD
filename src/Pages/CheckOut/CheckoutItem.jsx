export default function CheckoutItem({
  itemId,
  image,
  name,
  price,
  quantity,
}) {
  return (
    <>
      <tr key={itemId}>
        <td className="text-center"></td>
        <td>
          <img
            src={image}
            alt={name}
            style={{ width: 80, height: "auto" }}
            className="img-thumbnail"
          />
        </td>
        <td>{name}</td>
        <td className="text-center">${price.toFixed(2)}</td>
        <td className="text-center">
          <span className="mx-2">{quantity}</span>
        </td>
        <td className="text-center fw-bold">
          ${(price * quantity).toFixed(2)}
        </td>
      </tr>
    </>
  );
}
