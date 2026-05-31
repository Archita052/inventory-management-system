import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Products from "./Products";
import Customers from "./Customers";
import Orders from "./Orders";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>📦 Inventory Management System</h1>

        <nav
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <Link to="/">Products</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;