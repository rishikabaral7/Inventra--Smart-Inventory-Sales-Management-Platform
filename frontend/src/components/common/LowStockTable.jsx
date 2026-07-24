import React from "react";

const LowStockTable = ({ products = [] }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-800/80 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>⚠️</span> Low Stock Warnings
          </h2>
          <p className="text-xs text-slate-400 mt-1">Products requiring immediate reorder</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
          {products.length} items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm">
          <p className="text-3xl mb-3">✅</p>
          No low stock alerts. All inventory levels are healthy.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="bg-slate-800/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                <th className="py-4 sm:py-5 px-6 sm:px-8">ID</th>
                <th className="py-4 sm:py-5 px-6 sm:px-8">Product Name</th>
                <th className="py-4 sm:py-5 px-6 sm:px-8">Stock</th>
                <th className="py-4 sm:py-5 px-6 sm:px-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 sm:py-5 px-6 sm:px-8 font-mono text-xs text-slate-400">#{product.id}</td>
                  <td className="py-4 sm:py-5 px-6 sm:px-8 font-medium text-slate-200">{product.name}</td>
                  <td className="py-4 sm:py-5 px-6 sm:px-8 font-bold text-amber-400">{product.quantity} units</td>
                  <td className="py-4 sm:py-5 px-6 sm:px-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      Low Stock
                    </span>
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

export default LowStockTable;
