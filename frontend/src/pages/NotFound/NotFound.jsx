import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="rounded-2xl bg-slate-800 p-8 border border-slate-700 shadow-2xl text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold text-2xl flex items-center justify-center mx-auto mb-4">
          404
        </div>

        <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>

        <p className="mt-2 text-slate-400 text-sm leading-relaxed">
          The page or resource you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-xl text-sm font-semibold text-white px-6 py-2.5 transition hover:opacity-90 shadow-md"
          style={{ background: "var(--color-primary)" }}
        >
          Return to Dashboard →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

