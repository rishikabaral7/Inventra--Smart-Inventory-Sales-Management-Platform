import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCTS } from "../../graphql/queries/productQueries";
import { GET_SUPPLIERS } from "../../graphql/queries/supplierQueries";
import { CREATE_PURCHASE } from "../../graphql/mutations/purchaseMutations";

const inputStyle = { background: "#1a2235", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0" };

const PurchaseForm = ({ refetchPurchases }) => {
  const [supplierId, setSupplierId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: supplierData } = useQuery(GET_SUPPLIERS);
  const { data: productData } = useQuery(GET_PRODUCTS);
  const [createPurchase, { loading }] = useMutation(CREATE_PURCHASE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createPurchase({
        variables: {
          purchaseInput: {
            supplierId: Number(supplierId),
            items: [{ productId: Number(productId), quantity: Number(quantity), price: Number(price) }],
          },
        },
      });
      setSupplierId(""); setProductId(""); setQuantity(""); setPrice("");
      setIsOpen(false);
      if (refetchPurchases) refetchPurchases();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">Purchase Orders</h2>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 shadow-lg"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 6px 20px rgba(99,102,241,0.3)" }}
        >
          {isOpen ? "✕ Close Form" : "+ Create Purchase"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl space-y-4"
          style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <h3 className="text-base font-bold text-white pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            New Purchase Order
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Select Supplier *</label>
              <select
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                style={inputStyle}
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                required
              >
                <option value="">-- Choose Supplier --</option>
                {supplierData?.suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Select Product *</label>
              <select
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                style={inputStyle}
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                <option value="">-- Choose Product --</option>
                {productData?.products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Purchase Quantity *</label>
              <input
                type="number"
                min="1"
                placeholder="100"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Unit Price (Rs.) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="250.00"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
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
              disabled={loading}
              className="px-5 py-2 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {loading ? "Saving..." : "Submit Purchase Order"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PurchaseForm;