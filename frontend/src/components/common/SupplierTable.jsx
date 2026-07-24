import { useMutation } from "@apollo/client/react";
import { DELETE_SUPPLIER } from "../../graphql/mutations/supplierMutations";

const SupplierTable = ({ suppliers = [], refetchSuppliers }) => {
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER);

  const handleDelete = async (supplierId) => {
    if (!window.confirm("Are you sure you want to remove this supplier?")) return;
    try {
      await deleteSupplier({ variables: { supplierId } });
      if (refetchSuppliers) refetchSuppliers();
    } catch (err) {
      alert(err.message || "Failed to delete supplier");
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
      {suppliers.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          <p className="text-3xl mb-3">🚚</p>
          No suppliers registered yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <th className="py-4 px-5">Name</th>
                <th className="py-4 px-5">Contact Info</th>
                <th className="py-4 px-5">Address</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="transition"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="py-4 px-5 font-semibold text-white">{supplier.name}</td>
                  <td className="py-4 px-5">
                    <div className="text-slate-300 text-xs font-medium">{supplier.email}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{supplier.phone}</div>
                  </td>
                  <td className="py-4 px-5 text-xs text-slate-400 max-w-xs truncate">{supplier.address}</td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                      style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupplierTable;