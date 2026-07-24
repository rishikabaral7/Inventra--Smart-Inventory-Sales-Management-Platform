import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTS } from "../../graphql/queries/productQueries";
import { CREATE_PRODUCT } from "../../graphql/mutations/productMutations";

const inputStyle = {
  background: "#1a2235",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e2e8f0",
};

const Products = () => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", sku: "", description: "", price: "", quantity: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          input: {
            name: formData.name,
            sku: formData.sku,
            description: formData.description,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10),
          },
        },
      });
      setFormData({ name: "", sku: "", description: "", price: "", quantity: "" });
      setShowForm(false);
      refetch();
    } catch (err) {
      alert(err.message || "Failed to create product");
    }
  };

  const products = data?.products || [];

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 p-10 md:p-12 rounded-3xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Products Directory</h1>
          <p className="text-base text-slate-400 mt-2">Manage inventory items, SKUs, pricing, and stock levels.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-extrabold text-white transition hover:opacity-90 shadow-xl cursor-pointer"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 25px rgba(99,102,241,0.35)" }}
        >
          {showForm ? "✕ Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Create Product Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-10 md:p-12 rounded-3xl space-y-8"
          style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.35)" }}
        >
          <h2 className="text-xl font-extrabold text-white pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            Add New Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Product Name *", name: "name", type: "text", placeholder: "e.g. Wireless Mouse" },
              { label: "SKU *", name: "sku", type: "text", placeholder: "e.g. WM-1001" },
              { label: "Unit Price (Rs.) *", name: "price", type: "number", placeholder: "0.00", step: "0.01" },
              { label: "Quantity *", name: "quantity", type: "number", placeholder: "0" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  placeholder={field.placeholder}
                  step={field.step}
                  className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Product specs or notes..."
              className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
              style={inputStyle}
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 transition cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="px-8 py-3.5 rounded-2xl text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {creating ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
        {loading ? (
          <div className="p-20 text-center text-slate-500 text-base flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
            Loading products...
          </div>
        ) : error ? (
          <div className="p-12 text-center text-rose-400 text-base">Failed to load products: {error.message}</div>
        ) : products.length === 0 ? (
          <div className="p-20 text-center text-slate-500 text-base">
            <p className="text-5xl mb-4">📦</p>
            No products found. Click "Add Product" to create your first item.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-400" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <th className="py-5 px-8">ID</th>
                  <th className="py-5 px-8">Name</th>
                  <th className="py-5 px-8">SKU</th>
                  <th className="py-5 px-8">Category</th>
                  <th className="py-5 px-8">Price</th>
                  <th className="py-5 px-8">Stock</th>
                  <th className="py-5 px-8">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const isLow = p.quantity <= 10;
                  return (
                    <tr
                      key={p.id}
                      className="transition"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="py-5 px-8 font-mono text-xs text-slate-500">#{p.id}</td>
                      <td className="py-5 px-8">
                        <p className="font-bold text-white text-base">{p.name}</p>
                        {p.description && <p className="text-xs text-slate-400 truncate max-w-xs mt-1">{p.description}</p>}
                      </td>
                      <td className="py-5 px-8 font-mono text-sm text-slate-400">{p.sku}</td>
                      <td className="py-5 px-8">
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300" style={{ background: "rgba(255,255,255,0.07)" }}>
                          {p.category?.name || "General"}
                        </span>
                      </td>
                      <td className="py-5 px-8 font-extrabold text-white">Rs. {p.price?.toLocaleString()}</td>
                      <td className="py-5 px-8 font-bold text-slate-200">{p.quantity}</td>
                      <td className="py-5 px-8">
                        {isLow ? (
                          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.25)" }}>
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.25)" }}>
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
