import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTS } from "../../graphql/queries/productQueries";
import { CREATE_SALE } from "../../graphql/mutations/saleMutations";

const inputStyle = { background: "#1a2235", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0" };

const SaleForm = ({ refetchSales }) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const [createSale, { loading: creatingSale }] = useMutation(CREATE_SALE);

  const addItem = () => {
    if (!productId || !quantity) { alert("Please select a product and enter quantity."); return; }
    const selectedProduct = data?.products?.find((p) => p.id === Number(productId));
    if (!selectedProduct) { alert("Product not found."); return; }
    if (items.find((item) => item.productId === Number(productId))) { alert("Product already added to invoice."); return; }
    if (Number(quantity) > selectedProduct.quantity) { alert(`Insufficient stock! Only ${selectedProduct.quantity} units available.`); return; }
    setItems((prev) => [...prev, { productId: Number(productId), productName: selectedProduct.name, price: selectedProduct.price, quantity: Number(quantity) }]);
    setProductId(""); setQuantity("");
  };

  const removeItem = (pid) => setItems((prev) => prev.filter((item) => item.productId !== pid));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (items.length === 0) { alert("Please add at least one product to the sale."); return; }
    try {
      await createSale({ variables: { saleInput: { items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })) } } });
      setItems([]); setProductId(""); setQuantity(""); setIsOpen(false);
      if (refetchSales) refetchSales();
    } catch (err) {
      alert(err.message || "Failed to create sale");
    }
  };

  const grandTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">Sales Transactions</h2>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 shadow-lg"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 6px 20px rgba(99,102,241,0.3)" }}
        >
          {isOpen ? "✕ Close Form" : "⚡ New Sale Invoice"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl space-y-5"
          style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <h3 className="text-base font-bold text-white pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            ⚡ Point of Sale — Create Invoice
          </h3>

          {/* Line Item Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Select Product to Add</label>
              {loading ? (
                <p className="text-xs text-slate-400">Loading catalog...</p>
              ) : error ? (
                <p className="text-xs text-rose-400">Failed to load catalog</p>
              ) : (
                <select
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  style={inputStyle}
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  <option value="">-- Choose Product --</option>
                  {data?.products?.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — Rs. {p.price} (Stock: {p.quantity})</option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Qty</label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                  style={inputStyle}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold transition"
                  style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.25)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.15)"; }}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Preview */}
          {items.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Line Items</h4>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs font-semibold uppercase text-slate-500" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Subtotal</th>
                      <th className="py-3 px-4 text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.productId} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="py-3 px-4 font-semibold text-white">{item.productName}</td>
                        <td className="py-3 px-4 text-slate-300">Rs. {item.price}</td>
                        <td className="py-3 px-4 font-bold text-slate-200">{item.quantity}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Total Banner */}
              <div
                className="flex justify-between items-center p-4 rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.10))", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Payable Amount</span>
                <span className="text-2xl font-extrabold text-emerald-400">Rs. {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 transition"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingSale || items.length === 0}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {creatingSale ? "Processing..." : "✓ Complete Sale Invoice"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SaleForm;