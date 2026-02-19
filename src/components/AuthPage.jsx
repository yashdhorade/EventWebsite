import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "./Navbar";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Find this section in your handleAuth function
    // Find this section in your handleAuth function
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (error) {
        alert(error.message);
      } else if (data?.user) {
        alert("Signup successful! You can now Sign In.");
        setIsSignUp(false);
        setEmail("");
        setPassword("");
        setFullName("");
        setPhone("");
        setRole("user");
      }
    } else {
      // SIGN IN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else if (data?.user) {
        // Fetch role from profile for redirection
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        // Use profile role if exists, otherwise use auth metadata role
        const userRole =
          profile?.role || data.user.user_metadata?.role || "user";

        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "organizer") {
          navigate("/organizer-panel");
        } else {
          navigate("/events");
        }
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-white font-sans items-center justify-center overflow-hidden">
        <div className="w-full max-w-xl flex flex-col justify-center px-8 py-12 rounded-2xl shadow-xl bg-white/90">
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-5xl font-serif font-bold mb-2 tracking-tight text-center text-purple-700 drop-shadow-lg">
              Magical Moments
            </h1>
            <p className="text-xl text-blue-600 italic text-center font-semibold">
              Experience the Magic
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            <h2 className="text-3xl font-serif mb-2 text-center">
              {isSignUp ? "Join the magic" : "Welcome back !"}
            </h2>
            <p className="text-slate-400 text-center text-xs mb-6">
              The faster you fill up, the faster you get a ticket
            </p>

            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={fullName}
                  className="w-full border border-slate-200 p-3 rounded outline-none focus:border-black transition"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  className="w-full border border-slate-200 p-3 rounded outline-none focus:border-black transition"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  className="w-full border border-slate-200 p-3 rounded bg-transparent outline-none focus:border-black"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">I am an Attendee (User)</option>
                  <option value="organizer">I am an Organizer</option>
                </select>
              </>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                className="w-full border border-slate-200 p-3 rounded outline-none focus:border-black transition"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="********"
                required
                value={password}
                className="w-full border border-slate-200 p-3 rounded outline-none focus:border-black transition"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#1e2d2f] text-white py-4 rounded font-medium hover:bg-black transition-all active:scale-[0.98]"
            >
              {loading
                ? "Processing..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black font-bold hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign up"}
            </button>
          </p>
        </div>
        {/* Right Section: Hero Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            className="h-full w-full object-cover"
            alt="Event Atmosphere"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end p-20 text-center">
            <h2 className="text-6xl text-white font-serif mb-4">
              MagicalMoments
            </h2>
            <p className="text-white tracking-[0.3em] uppercase text-sm font-light">
              Experience the Magic
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
