import { useQuery } from "@apollo/client/react";
import SaleForm from "../../components/forms/SaleForm";
import { GET_SALES } from "../../graphql/queries/saleQueries";

const Sales = () => {
  const { data, loading, error, refetch } = useQuery(GET_SALES);
  const sales = data?.sales || [];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div
        className="p-8 rounded-3xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Sales & POS Operations</h1>
        <p className="text-sm text-slate-400 mt-1">
          Issue sales invoices, process multi-product orders, and review sales logs.
        </p>
      </div>

      <SaleForm refetchSales={refetch} />

      {/* Sales List Table */}
      <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>🧾</span> Recorded Invoices
          </h2>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            {sales.length} invoices
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-500 text-sm flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
            Loading sales history...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-rose-400 text-sm">Failed to load sales: {error.message}</div>
        ) : sales.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-sm">
            <p className="text-4xl mb-3">🧾</p>
            No sales invoices recorded yet. Use the form above to issue one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-400" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Invoice #</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="transition"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="py-4 px-6 font-mono text-xs text-slate-500">#{sale.id}</td>
                    <td className="py-4 px-6 font-mono text-sm font-semibold text-white">{sale.invoiceNumber}</td>
                    <td className="py-4 px-6">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Completed
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-emerald-400">
                      Rs. {(sale.totalAmount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
