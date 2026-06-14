
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/5 shadow-sm">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Branding Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-lg shadow-md shadow-blue-500/10">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
              TaskFlow
            </span>
            <span className="hidden sm:inline bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-blue-500/10 tracking-widest">
              MVP
            </span>
          </div>

          {/* User Actions */}
          {user && (
            <div className="flex items-center space-x-6">
              {/* Profile section */}
              <div className="flex items-center space-x-3 border-r border-white/10 pr-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                  {user.username.charAt(0)}
                </div>
                <span className="hidden md:inline text-sm font-semibold text-slate-300">
                  {user.username}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={logout}
                className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-white/5 hover:border-red-500/10 active:scale-[0.98] transition-all duration-150 text-sm font-semibold"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
