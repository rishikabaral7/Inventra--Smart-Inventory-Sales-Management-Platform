import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_USERS } from "../../graphql/queries/userQueries";
import { UPDATE_USER_ROLE, CREATE_USER } from "../../graphql/mutations/userMutations";

const inputStyle = {
  background: "#1a2235",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#e2e8f0",
};

const ROLES_LIST = [
  { value: "OWNER", label: "👑 Owner (Full Exec Access)", badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
  { value: "ADMIN", label: "🛡️ Admin (System Admin)", badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  { value: "MANAGER", label: "💼 Manager (Operations Lead)", badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { value: "INVENTORY_MANAGER", label: "📦 Inventory Lead (Stock & Suppliers)", badgeClass: "bg-teal-500/10 text-teal-400 border-teal-500/30" },
  { value: "SALESPERSON", label: "💰 Sales Representative (POS Terminal)", badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30" },
];

export default function Users() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [updateUserRole, { loading: updating }] = useMutation(UPDATE_USER_ROLE);
  const [createUser, { loading: creating }] = useMutation(CREATE_USER);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUserData, setNewUserData] = useState({ fullName: "", email: "", password: "", role: "SALESPERSON" });

  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingUserId(userId);
      setFeedbackMsg(null);
      await updateUserRole({
        variables: {
          userId: parseInt(userId),
          role: newRole,
        },
      });
      setFeedbackMsg({ type: "success", text: `User role updated to ${newRole} successfully!` });
      refetch();
    } catch (err) {
      setFeedbackMsg({ type: "error", text: err.message || "Failed to update role" });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setFeedbackMsg(null);
      await createUser({
        variables: {
          fullName: newUserData.fullName,
          email: newUserData.email,
          password: newUserData.password,
          role: newUserData.role,
        },
      });
      setFeedbackMsg({ type: "success", text: `New team member "${newUserData.fullName}" created successfully!` });
      setNewUserData({ fullName: "", email: "", password: "", role: "SALESPERSON" });
      setShowAddForm(false);
      refetch();
    } catch (err) {
      setFeedbackMsg({ type: "error", text: err.message || "Failed to create user" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-slate-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-base font-medium">Loading user directory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-6 rounded-3xl text-base">
        Error loading users: {error.message}
      </div>
    );
  }

  const users = data?.users || [];

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 bg-slate-900/70 backdrop-blur-md p-10 md:p-12 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Staff & Role Management</h1>
          <p className="text-slate-400 text-base mt-2">
            Create team member accounts and assign access roles (Owner, Admin, Manager, Inventory Lead, Sales).
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-base font-extrabold text-white transition hover:opacity-90 shadow-xl cursor-pointer"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 25px rgba(99,102,241,0.35)" }}
        >
          {showAddForm ? "✕ Close Form" : "+ Add New Team Member"}
        </button>
      </div>

      {feedbackMsg && (
        <div
          className={`p-6 rounded-3xl border text-base font-semibold transition-all ${
            feedbackMsg.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          {feedbackMsg.text}
        </div>
      )}

      {/* Add User Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateUserSubmit}
          className="p-10 md:p-12 rounded-3xl space-y-8"
          style={{ background: "#111827", border: "1px solid rgba(99,102,241,0.35)" }}
        >
          <h2 className="text-xl font-extrabold text-white pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            ➕ Create New Employee / Staff Account
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={newUserData.fullName}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, fullName: e.target.value }))}
                className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. alex@company.com"
                value={newUserData.email}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={newUserData.password}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500 placeholder-slate-600"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2.5 uppercase tracking-wider">Assign Role *</label>
              <select
                value={newUserData.role}
                onChange={(e) => setNewUserData((prev) => ({ ...prev, role: e.target.value }))}
                className="w-full rounded-2xl px-6 py-4 text-base outline-none transition focus:ring-2 focus:ring-indigo-500"
                style={inputStyle}
              >
                {ROLES_LIST.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-400 transition cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating}
              className="px-8 py-3.5 rounded-2xl text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {creating ? "Creating Account..." : "✓ Create Staff Account"}
            </button>
          </div>
        </form>
      )}

      {/* Directory Table */}
      <div className="bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-base text-slate-300">
            <thead>
              <tr className="bg-slate-800/60 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <th className="px-8 py-5 font-semibold">User / Staff Member</th>
                <th className="px-8 py-5 font-semibold">Email</th>
                <th className="px-8 py-5 font-semibold">Assigned Role</th>
                <th className="px-8 py-5 font-semibold text-right">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => {
                const isUserUpdating = updating && updatingUserId === u.id;
                const roleUpper = (u.role || "SALESPERSON").toUpperCase();
                const matchedRole = ROLES_LIST.find((r) => r.value === roleUpper) || {
                  badgeClass: "bg-slate-700/40 text-slate-300 border-slate-600/40",
                };

                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-8 py-5 font-medium text-white flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-base shadow-md flex-shrink-0">
                        {u.fullName ? u.fullName.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{u.fullName || "N/A"}</div>
                        <div className="text-xs text-slate-400">ID: #{u.id}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-300">{u.email}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border ${matchedRole.badgeClass}`}>
                        {roleUpper}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <select
                        disabled={isUserUpdating}
                        value={roleUpper}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-2xl px-5 py-3 font-semibold focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {ROLES_LIST.map((r) => (
                          <option key={r.value} value={r.value}>{r.value}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
