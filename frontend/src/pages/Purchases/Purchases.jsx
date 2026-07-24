import { useQuery } from "@apollo/client/react";
import PurchaseForm from "../../components/forms/PurchaseForm";
import PurchaseTable from "../../components/common/PurchaseTable";
import { GET_PURCHASES } from "../../graphql/queries/purchaseQueries";

const Purchases = () => {
  const { data, loading, error, refetch } = useQuery(GET_PURCHASES);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div
        className="p-8 rounded-3xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Purchases & Procurement</h1>
        <p className="text-sm text-slate-400 mt-1">
          Record incoming inventory from suppliers and track purchase invoices.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm gap-3">
          <div className="w-8 h-8 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
          Loading purchase orders...
        </div>
      )}

      {error && (
        <div className="p-5 rounded-2xl text-sm text-rose-400" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          Failed to load purchases: {error.message}
        </div>
      )}

      {!loading && !error && (
        <>
          <PurchaseForm refetchPurchases={refetch} />
          <PurchaseTable purchases={data?.purchases || []} />
        </>
      )}
    </div>
  );
};

export default Purchases;