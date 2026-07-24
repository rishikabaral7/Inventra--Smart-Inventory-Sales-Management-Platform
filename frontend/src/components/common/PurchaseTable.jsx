const PurchaseTable = ({ purchases = [] }) => {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
      {purchases.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          <p className="text-3xl mb-3">🛒</p>
          No purchase orders found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <th className="py-4 px-5">Invoice #</th>
                <th className="py-4 px-5">Supplier</th>
                <th className="py-4 px-5">Items</th>
                <th className="py-4 px-5 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="transition"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="py-4 px-5 font-mono text-sm font-semibold text-white">{purchase.invoiceNumber}</td>
                  <td className="py-4 px-5">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      Supplier #{purchase.supplierId}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-400 text-xs">{purchase.items?.length || 0} line items</td>
                  <td className="py-4 px-5 text-right font-bold text-indigo-400">
                    Rs. {(purchase.totalAmount || 0).toLocaleString()}
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

export default PurchaseTable;