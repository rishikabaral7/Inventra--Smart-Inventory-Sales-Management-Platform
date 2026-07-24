import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--color-bg)" }}>
      <div
        className="rounded-2xl p-10 text-center max-w-md w-full"
        style={{ background: "#111827", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <div
          className="w-20 h-20 rounded-2xl font-black text-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
        >
          403
        </div>
        <h1 className="text-2xl font-extrabold text-white">Access Denied</h1>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          You do not have the required permissions or role to access this route. Contact your administrator to request access.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-xl text-sm font-bold text-white px-6 py-3 transition hover:opacity-90 shadow-lg"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 6px 20px rgba(99,102,241,0.3)" }}
        >
          Return to Dashboard →
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;