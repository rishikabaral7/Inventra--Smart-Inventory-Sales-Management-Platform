import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useRegister from "../../hooks/useRegister";

const Register = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { registerUser, loading, error } = useRegister();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--color-bg)" }}>
      {/* Left brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 flex-shrink-0 p-16 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)" }}
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
            Start managing<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "gradient(90deg, #a5b4fc, #c4b5fd)" }}>
              smarter today.
            </span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Join your team on Inventra and take full control of your inventory and sales workflow.
          </p>
          <ul className="space-y-4">
            {[
              "Real-time stock monitoring",
              "Automated invoice generation",
              "Role-based access control",
              "Full sales & purchase history",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-base text-slate-200">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-slate-500 text-xs font-medium">© 2026 Inventra. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12" style={{ background: "var(--color-bg)" }}>
        <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>INV</div>
            <span className="text-xl font-extrabold text-white">Inventra</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Create account</h2>
            <p className="text-base text-slate-400">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2.5 uppercase tracking-wider">Full name</label>
              <input
                id="register-fullname"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Smith"
                className="w-full rounded-2xl px-5 py-4 text-base text-white placeholder-slate-500 outline-none transition focus:ring-2 focus:ring-indigo-500"
                style={{ background: "#1a2235", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2.5 uppercase tracking-wider">Email address</label>
              <input
                id="register-email"
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
                id="register-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Min. 8 characters"
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
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-4 text-base font-extrabold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-2xl mt-4 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 10px 30px rgba(99,102,241,0.4)" }}
            >
              {loading ? "Creating account…" : "Create account →"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
