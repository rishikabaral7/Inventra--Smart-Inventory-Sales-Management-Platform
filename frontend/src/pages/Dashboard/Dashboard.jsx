import React from "react";
import { useQuery } from "@apollo/client/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashboardCard from "../../components/common/DashboardCard";
import LowStockTable from "../../components/common/LowStockTable";
import { GET_DASHBOARD } from "../../graphql/queries/dashboardQueries";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = (user?.role || "USER").toUpperCase();
  const isAdminOrManager = ["OWNER", "ADMIN", "MANAGER"].includes(userRole);

  const { data, loading, error } = useQuery(GET_DASHBOARD, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-base font-medium">Loading dashboard data...</p>
        <p className="text-xs text-slate-500 mt-2">Connecting to backend server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-6 rounded-3xl">
          <h3 className="font-bold text-base mb-1">⚠️ Backend Connection Error</h3>
          <p className="text-sm">{error.message}</p>
          <p className="text-xs text-slate-500 mt-2">
            Make sure your backend server is running at the correct port. Try restarting it with <code className="bg-slate-800 px-1 rounded">uvicorn app.main:app --reload</code>
          </p>
        </div>
        {/* Still show empty dashboard structure */}
        <EmptyDashboard userRole={userRole} user={user} isAdminOrManager={isAdminOrManager} />
      </div>
    );
  }

  const dashboard = data?.dashboard ?? {
    totalProducts: 0,
    totalCategories: 0,
    totalSales: 0,
    totalInventoryQuantity: 0,
    totalInventoryValue: 0,
    recentSales: [],
    lowStockProducts: [],
  };

  return <DashboardContent dashboard={dashboard} user={user} userRole={userRole} isAdminOrManager={isAdminOrManager} />;
};

const EmptyDashboard = ({ userRole, user, isAdminOrManager }) => (
  <DashboardContent
    dashboard={{ totalProducts: 0, totalCategories: 0, totalSales: 0, totalInventoryQuantity: 0, totalInventoryValue: 0, recentSales: [], lowStockProducts: [] }}
    user={user}
    userRole={userRole}
    isAdminOrManager={isAdminOrManager}
  />
);

const DashboardContent = ({ dashboard, user, userRole, isAdminOrManager }) => (
  <div className="space-y-8 sm:space-y-12 pb-16">
    {/* Welcome Banner */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 border border-slate-800 shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-extrabold uppercase tracking-wider">
              {userRole} Workspace
            </span>
            <span className="text-xs text-slate-400 font-semibold">• StockFlow ERP</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Welcome back, {user?.fullName || "Team Member"}! 👋
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            {isAdminOrManager
              ? "Here is your executive overview of stock levels, inventory valuation, and sales metrics."
              : "Welcome to your POS workstation. Manage customer checkout and track item stocks efficiently."}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            to="/sales"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm sm:text-base font-extrabold shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <span>⚡</span> Open POS Terminal
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
    </div>

    {/* Metrics Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashboardCard title="Total Products" value={dashboard.totalProducts} icon="📦" color="indigo" />
      <DashboardCard title="Categories" value={dashboard.totalCategories} icon="🏷️" color="purple" />
      <DashboardCard title="Total Sales" value={dashboard.totalSales} icon="💰" color="emerald" />
      <DashboardCard title="Stock Qty" value={`${dashboard.totalInventoryQuantity} pcs`} icon="📊" color="blue" />
    </div>

    {/* Admin / Manager Valuation Banner */}
    {isAdminOrManager && (
      <div className="rounded-3xl p-8 sm:p-10 bg-slate-900/70 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Total Inventory Valuation</span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 text-white tracking-tight">
            Rs. {(dashboard.totalInventoryValue || 0).toLocaleString()}
          </h2>
          <p className="text-xs text-slate-400 mt-2">Calculated across all registered items currently in stock.</p>
        </div>
        <div className="px-5 py-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-extrabold uppercase tracking-wider flex-shrink-0">
          Live Valuation
        </div>
      </div>
    )}

    {/* Bottom Grid: Recent Sales & Low Stock */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-10">
      {/* Recent Sales */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-800/80 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>💰</span> Recent Sales Transactions
            </h2>
            <p className="text-xs text-slate-400 mt-1">Latest completed store transactions</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
            {dashboard.recentSales?.length || 0} sales
          </span>
        </div>
        {!dashboard.recentSales || dashboard.recentSales.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            <p className="text-3xl mb-3">🧾</p>
            No sales recorded yet. Go to Sales to create your first invoice.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="bg-slate-800/60 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 sm:py-5 px-6 sm:px-8">Invoice</th>
                  <th className="py-4 sm:py-5 px-6 sm:px-8 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {dashboard.recentSales.slice(0, 5).map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 sm:py-5 px-6 sm:px-8 font-mono text-xs sm:text-sm font-semibold text-slate-200">
                      {sale.invoiceNumber}
                    </td>
                    <td className="py-4 sm:py-5 px-6 sm:px-8 font-bold text-emerald-400 text-right">
                      Rs. {(sale.totalAmount || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Low Stock */}
      <LowStockTable products={dashboard.lowStockProducts} />
    </div>
  </div>
);

export default Dashboard;
