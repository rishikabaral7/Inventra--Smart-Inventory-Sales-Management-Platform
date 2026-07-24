import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loginUser, loading, error } = useLogin();
  const [formData, setFormData] = useState({ email: "", password: "" });

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-bg)" }}>
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 flex-shrink-0 p-16 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)" }}
      >
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}></div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-2xl" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            INV
          </div>
          <span className="text-2xl font-extrabold tracking-tight">Inventra</span>
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-black leading-tight mb-6 tracking-tight">
            Manage your<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #a5b4fc, #c4b5fd)" }}>
              inventory smarter.
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-12">
            A complete ERP platform to track products, suppliers, purchases, and sales — all in one unified workspace.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "📦 Products", value: "Real-time stock tracking" },
              { label: "💰 Sales", value: "Automated POS invoices" },
              { label: "🚚 Purchases", value: "Supplier & order logs" },
              { label: "📊 Dashboard", value: "Live business analytics" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-5 border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                <p className="text-xs text-slate-400">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-slate-500 text-xs font-medium">© 2026 Inventra. All rights reserved.</p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12" style={{ background: "var(--color-bg)" }}>
        <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>INV</div>
            <span className="text-xl font-extrabold text-white">Inventra</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome back</h2>
            <p className="text-base text-slate-400">Sign in to access your ERP workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2.5 uppercase tracking-wider">Email address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
                className="w-full rounded-2xl px-5 py-4 text-base text-white placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-indigo-500"
                style={{ background: "#1a2235", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2.5 uppercase tracking-wider">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl px-5 py-4 text-base text-white placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-indigo-500"
                style={{ background: "#1a2235", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
                <span className="text-rose-400 text-lg">⚠</span>
                <p className="text-sm font-semibold text-rose-400">{error.message}</p>
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-4 text-base font-extrabold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-2xl mt-4 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 10px 30px rgba(99,102,241,0.4)" }}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;