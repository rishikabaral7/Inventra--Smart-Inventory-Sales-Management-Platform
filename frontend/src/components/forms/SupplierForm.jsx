import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_SUPPLIER } from "../../graphql/mutations/supplierMutations";

const inputStyle = {
  background: "#1a2235",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e2e8f0",
};

const SupplierForm = ({ refetchSuppliers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [createSupplier, { loading }] = useMutation(CREATE_SUPPLIER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createSupplier({ variables: { supplierInput: { name, email, phone, address } } });
      setName(""); setEmail(""); setPhone(""); setAddress("");
      setIsOpen(false);
      if (refetchSuppliers) refetchSuppliers();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white">Registered Suppliers</h2>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 shadow-lg"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 6px 20px rgba(99,102,241,0.3)" }}
        >
          {isOpen ? "✕ Close Form" : "+ Add Supplier"}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl space-y-4"
          style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <h3 className="text-base font-bold text-white pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            New Supplier Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Company Name *</label>
              <input
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
                placeholder="Acme Trading Corp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Contact Email *</label>
              <input
                type="email"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
                placeholder="supplier@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number *</label>
              <input
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Physical Address *</label>
            <textarea
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
              style={inputStyle}
              rows="2"
              placeholder="123 Industrial Parkway, Suite 400..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
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
              {loading ? "Saving..." : "Save Supplier"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SupplierForm;