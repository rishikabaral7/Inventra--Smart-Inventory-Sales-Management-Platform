import { useQuery } from "@apollo/client/react";
import SupplierForm from "../../components/forms/SupplierForm";
import SupplierTable from "../../components/common/SupplierTable";
import { GET_SUPPLIERS } from "../../graphql/queries/supplierQueries";

const Suppliers = () => {
  const { data, loading, error, refetch } = useQuery(GET_SUPPLIERS);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div
        className="p-8 rounded-3xl"
        style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Supplier Management</h1>
        <p className="text-sm text-slate-400 mt-1">
          Maintain your vendor directory, contact details, phone numbers, and location information.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm gap-3">
          <div className="w-8 h-8 rounded-full border-b-2 border-indigo-500 animate-spin"></div>
          Loading suppliers...
        </div>
      )}

      {error && (
        <div className="p-5 rounded-2xl text-sm text-rose-400" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          Failed to load suppliers: {error.message}
        </div>
      )}

      {!loading && !error && (
        <>
          <SupplierForm refetchSuppliers={refetch} />
          <SupplierTable suppliers={data?.suppliers || []} refetchSuppliers={refetch} />
        </>
      )}
    </div>
  );
};

export default Suppliers;