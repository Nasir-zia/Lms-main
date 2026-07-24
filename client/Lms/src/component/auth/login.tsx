import { Eye, EyeOff, Mail, Lock, ArrowRight, BookOpen, KeyRound } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onToggleView: () => void;
}

const Login = ({ onToggleView }: LoginProps) => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [rememberMe, setRememberMe] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    // Simulate API login delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Logged in successfully as ${role}! Redirecting...`);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      
      {/* Left side: Premium Branding & Info Pane */}
      <div className="relative hidden md:flex md:w-1/2 flex-col justify-between p-16 bg-gradient-to-tr from-[#121829] via-[#1a233d] to-[#0f172a] overflow-hidden border-r border-slate-800/50">
        
        {/* Dynamic Background Blur Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"></div>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="relative flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            EduVerse <span className="text-blue-500 font-medium text-sm px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 ml-1">LMS</span>
          </span>
        </div>

        {/* Feature Illustration and Pitch */}
        <div className="relative my-auto z-10 flex flex-col items-center">
          <div className="relative w-full max-w-[380px] p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/60 shadow-2xl">
            <img
              src="https://illustrations.popsy.co/blue/work-from-home.svg"
              alt="Learning"
              className="w-full h-auto max-h-[220px] drop-shadow-[0_15px_30px_rgba(59,130,246,0.15)] transform hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
            <div className="absolute -top-3 -right-3 bg-violet-500 text-white rounded-lg p-2.5 shadow-lg shadow-violet-500/20 animate-pulse">
              <KeyRound size={18} />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mt-10 tracking-tight text-center leading-snug">
            Welcome back to the <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Hub of Knowledge
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-center text-base max-w-[420px] leading-relaxed">
            Log in to access your course files, quizzes, assignments, and connection with instructors.
          </p>
        </div>

        {/* Footer info / Testimonial */}
        <div className="relative z-10 flex items-center gap-4 bg-slate-900/30 backdrop-blur-sm p-4 rounded-xl border border-slate-800/40">
          <div className="flex -space-x-2">
            <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces" alt="" />
            <img className="w-8 h-8 rounded-full border-2 border-slate-950" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=faces" alt="" />
          </div>
          <p className="text-xs text-slate-400 leading-snug">
            Over <strong className="text-white">100,000+ hours</strong> of coding lessons completed today.
          </p>
        </div>
      </div>

      {/* Right side: Interactive Login View */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#090d16] relative">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md z-10">
          
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">
                Log In
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  role === "student"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  role === "teacher"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Instructor
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  role === "admin"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div className="group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-400">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nasir@example.com"
                    className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors group-focus-within:text-blue-400">
                    Password
                  </label>
                  <a href="#" className="text-xs text-blue-400 hover:text-blue-300 font-semibold hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3.5 pl-11 pr-11 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me checkbox */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2.5 text-sm text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4.5 w-4.5 accent-blue-600 rounded bg-slate-900 border border-slate-800 cursor-pointer focus:outline-none"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Log In <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Separator */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-[1px] bg-slate-800/80"></div>
                <span className="text-slate-500 text-xs font-bold tracking-widest">OR</span>
                <div className="flex-1 h-[1px] bg-slate-800/80"></div>
              </div>

              {/* Social logins */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 font-medium py-3.5 px-4 rounded-xl transition duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.137 4.114-3.355 0-6.075-2.72-6.075-6.075s2.72-6.075 6.075-6.075c1.497 0 2.859.543 3.928 1.432l3.22-3.22C19.123 2.106 15.86 1 12.24 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.54 11.24-11.24 0-.768-.078-1.503-.22-2.2H12.24z"/>
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 font-medium py-3.5 px-4 rounded-xl transition duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.27C5.37 1.27 0 6.64 0 13.17c0 5.22 3.47 9.65 8.3 11.2.6.11.82-.26.82-.57 0-.29-.01-1.05-.02-2.06-3.34.71-4.04-1.57-4.04-1.57-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.21 1.85 1.21 1.07 1.79 2.82 1.27 3.51.97.11-.76.42-1.27.76-1.56-2.67-.29-5.47-1.31-5.47-5.78 0-1.27.47-2.31 1.24-3.13-.12-.29-.54-1.48.12-3.08 0 0 .99-.31 3.25 1.18a11.5 11.5 0 0 1 6.01 0c2.25-1.49 3.24-1.18 3.24-1.18.67 1.6.25 2.79.13 3.08.77.82 1.24 1.86 1.24 3.13 0 4.49-2.81 5.48-5.49 5.77.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.22.69.83.57 4.82-1.56 8.29-5.99 8.29-11.21 0-6.53-5.37-11.9-12-11.9z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Signup Redirect */}
              <p className="text-center text-slate-500 text-sm mt-6">
                Don't have an account?
                <button
                  type="button"
                  onClick={onToggleView}
                  className="text-blue-400 hover:text-blue-300 font-bold ml-1.5 focus:outline-none"
                >
                  Create account
                </button>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
