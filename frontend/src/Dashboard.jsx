import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const p = await axios.get(`${API}/products`);
      const c = await axios.get(`${API}/customers`);
      const o = await axios.get(`${API}/orders`);

      setProducts(p.data);
      setCustomers(c.data);
      setOrders(o.data);
    };

    fetchData();
  }, []);

  const lowStock = products.filter((p) => p.stock < 5);

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "20px" }}>
          <h3>Low Stock Products</h3>
          <p>{lowStock.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
