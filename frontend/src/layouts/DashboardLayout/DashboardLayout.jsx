import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  const roleColor = {
    OWNER:             { bg: "rgba(234,179,8,0.15)",   text: "#fde047", border: "rgba(234,179,8,0.35)" },
    ADMIN:             { bg: "rgba(139,92,246,0.15)",  text: "#a78bfa", border: "rgba(139,92,246,0.30)" },
    MANAGER:           { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa", border: "rgba(59,130,246,0.30)" },
    INVENTORY_MANAGER: { bg: "rgba(20,184,166,0.15)",  text: "#2dd4bf", border: "rgba(20,184,166,0.30)" },
    SALESPERSON:       { bg: "rgba(244,63,94,0.15)",   text: "#fb7185", border: "rgba(244,63,94,0.30)" },
  };
  const role = (user?.role || "SALESPERSON").toUpperCase();
  const colors = roleColor[role] || roleColor.SALESPERSON;

  return (
    <div className="flex min-h-screen font-sans" style={{ background: "var(--color-bg)" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-20 flex-shrink-0"
          style={{ background: "rgba(11,15,26,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-4 pl-12 lg:pl-0">
            <div>
              <p className="text-xs font-medium text-slate-400">Welcome back,</p>
              <p className="text-base sm:text-lg font-extrabold text-white leading-none mt-0.5">
                {user?.fullName || "User"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {role}
            </div>
            <div
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: "rgba(16,185,129,0.10)", color: "#34d399", border: "1px solid rgba(16,185,129,0.20)" }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              <span className="hidden sm:inline">System Online</span>
              <span className="sm:hidden">Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
