import { formatPrice } from '../utils';

// Table of the products inside one order (used on Checkout and Account)
export default function OrderItems({ items }) {
  return (
    <table className="table compact">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.product_id}>
            <td data-label="Product">{item.product_name}</td>
            <td data-label="Qty">{item.quantity}</td>
            <td data-label="Price">{formatPrice(item.price)}</td>
            <td data-label="Subtotal">{formatPrice(item.price * item.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
