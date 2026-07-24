import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarMenu } from "../../constants/menu";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, logoutUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (user?.role || "SALESPERSON").toUpperCase();

  const visibleMenuItems = sidebarMenu.filter((menu) =>
    menu.roles
      ? menu.roles.map((r) => r.toUpperCase()).includes(role)
      : true
  );

  const roleColor = {
    OWNER:             { text: "#fde047", bg: "rgba(234,179,8,0.15)",   border: "rgba(234,179,8,0.35)" },
    ADMIN:             { text: "#a78bfa", bg: "rgba(139,92,246,0.15)",  border: "rgba(139,92,246,0.30)" },
    MANAGER:           { text: "#60a5fa", bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.30)" },
    INVENTORY_MANAGER: { text: "#2dd4bf", bg: "rgba(20,184,166,0.15)",  border: "rgba(20,184,166,0.30)" },
    SALESPERSON:       { text: "#fb7185", bg: "rgba(244,63,94,0.15)",   border: "rgba(244,63,94,0.30)" },
  };
  const colors = roleColor[role] || roleColor.SALESPERSON;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          INV
        </div>
        <div>
          <span className="font-extrabold text-base tracking-tight text-white block leading-none">Inventra</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest block mt-1">
            Enterprise System
          </span>
        </div>
      </div>

      {user && (
        <div className="p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              className="w-10 h-10 rounded-2xl font-black flex items-center justify-center text-white text-base shadow flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.fullName || "User"}</p>
              <p className="text-xs text-slate-400 truncate">{user.email || ""}</p>
              <span
                className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase"
                style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
              >
                {role}
              </span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Navigation Menu</div>
        {visibleMenuItems.length === 0 && (
          <p className="text-xs text-slate-500 px-3">No menu items available</p>
        )}
        {visibleMenuItems.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                isActive
                  ? "text-white shadow-xl"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15))", border: "1px solid rgba(99,102,241,0.35)" }
                : { background: "transparent", border: "1px solid transparent" }
            }
          >
            <span className="text-xl w-7 text-center flex-shrink-0">{menu.icon || "📌"}</span>
            <span>{menu.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          type="button"
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer"
          style={{ color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
        >
          <span className="text-base">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
        style={{ background: "#1a2235", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className="text-white text-lg">{mobileOpen ? "✕" : "☰"}</span>
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`lg:hidden fixed top-0 left-0 h-full z-50 w-72 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#0d1121", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      >
        <SidebarContent />
      </aside>

      <aside
        className="hidden lg:flex flex-col w-72 min-h-screen flex-shrink-0"
        style={{ background: "#0d1121", borderRight: "1px solid rgba(255,255,255,0.08)" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
