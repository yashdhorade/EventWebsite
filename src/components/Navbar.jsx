import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/magical_moments_1.png";
import { LogOut, Menu, X, Calendar, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) fetchRole(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) fetchRole(session.user.id);
      else setRole(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (data) setRole(data.role);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-6 left-6 right-6 z-50 rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-slate-200 px-8 py-3">
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => (window.location.href = "/")}
        >
          <img
            src={logo}
            alt="MagicalMoments Logo"
            className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => (window.location.href = "/events")}
            className="text-sm font-bold text-slate-500 hover:text-black transition-colors"
          >
            Events
          </button>

          {role === "organizer" && (
            <button
              onClick={() => (window.location.href = "/organizer-panel")}
              className="text-sm font-bold text-slate-500 hover:text-black transition-colors flex items-center gap-2"
            >
              <Calendar size={18} /> My Events
            </button>
          )}

          {role === "admin" && (
            <button
              onClick={() => (window.location.href = "/admin-dashboard")}
              className="text-sm font-bold text-slate-500 hover:text-black transition-colors flex items-center gap-2"
            >
              <ShieldCheck size={18} /> Admin Panel
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/about")}
            className="text-sm font-bold text-slate-500 hover:text-black transition-colors"
          >
            About Us
          </button>

          <button
            onClick={() => (window.location.href = "/contact")}
            className="text-sm font-bold text-slate-500 hover:text-black transition-colors"
          >
            Contact Us
          </button>

          {user ? (
            <div className="flex items-center gap-6 border-l pl-10 border-slate-200">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                  {role}
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {user.email.split("@")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-[#1e2d2f] text-white px-6 py-2 rounded text-sm font-bold hover:bg-black transition-all shadow-lg active:scale-95"
            >
              Login
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1e2d2f] p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl rounded-b-2xl">
          <button
            className="block w-full text-left font-bold text-slate-500"
            onClick={() => (window.location.href = "/events")}
          >
            Events
          </button>
          {role === "organizer" && (
            <button
              className="block w-full text-left font-bold text-slate-500"
              onClick={() => (window.location.href = "/organizer-panel")}
            >
              My Events
            </button>
          )}
          {role === "admin" && (
            <button
              className="block w-full text-left font-bold text-slate-500"
              onClick={() => (window.location.href = "/admin-dashboard")}
            >
              Admin Panel
            </button>
          )}
          <button
            className="block w-full text-left font-bold text-slate-500"
            onClick={() => (window.location.href = "/about")}
          >
            About Us
          </button>
          <button
            className="block w-full text-left font-bold text-slate-500"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Us
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left font-bold text-red-600 pt-4 border-t border-slate-100"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
