import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
  });

  const fetchData = async () => {
    const ordersRes = await axios.get(`${API}/orders`);
    const customersRes = await axios.get(`${API}/customers`);
    const productsRes = await axios.get(`${API}/products`);

    setOrders(ordersRes.data);
    setCustomers(customersRes.data);
    setProducts(productsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/orders`, {
        customer_id: Number(form.customer_id),
        product_id: Number(form.product_id),
        quantity: Number(form.quantity),
      });

      alert("Order created successfully");

      setForm({
        customer_id: "",
        product_id: "",
        quantity: 1,
      });

      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || "Order failed");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`${API}/orders/${id}`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.detail || "Delete failed");
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "25px",
        }}
      >
        <h2>Create Order</h2>

        <form
          onSubmit={createOrder}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={form.customer_id}
            onChange={(e) =>
              setForm({ ...form, customer_id: e.target.value })
            }
          >
            <option value="">Select Customer</option>

            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.product_id}
            onChange={(e) =>
              setForm({ ...form, product_id: e.target.value })
            }
          >
            <option value="">Select Product</option>

            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <button type="submit">Create Order</button>
        </form>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2>Orders</h2>

        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer_id}</td>
                <td>{o.product_id}</td>
                <td>{o.quantity}</td>
                <td>₹{o.total_amount}</td>

                <td>
                  <button onClick={() => deleteOrder(o.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;

