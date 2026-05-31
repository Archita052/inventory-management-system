import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/products/${editingId}`, {
          name: form.name,
          sku: form.sku,
          price: Number(form.price),
          stock: Number(form.stock),
        });

        setEditingId(null);
      } else {
        await axios.post(`${API}/products`, {
          name: form.name,
          sku: form.sku,
          price: Number(form.price),
          stock: Number(form.stock),
        });
      }

      setForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Operation failed");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`${API}/products/${id}`);
      fetchProducts();
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
        <h2>{editingId ? "Update Product" : "Add Product"}</h2>

        <form
          onSubmit={addProduct}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="SKU"
            value={form.sku}
            onChange={(e) =>
              setForm({ ...form, sku: e.target.value })
            }
          />

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2>Products</h2>

        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>

                <td>
                  <button onClick={() => startEdit(p)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{ marginLeft: "10px" }}
                  >
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

export default Products;
