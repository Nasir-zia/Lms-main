import { Eye, EyeOff, Mail, Lock, User, Check, ShieldCheck, ArrowRight, Smartphone, Sparkles, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

interface SignupProps {
  onToggleView: () => void;
}

const Signup = ({ onToggleView }: SignupProps) => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(59);

  // Real-time password strength indicator
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback("");
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setPasswordStrength(score);

    if (score <= 2) {
      setPasswordFeedback("Weak");
    } else if (score <= 4) {
      setPasswordFeedback("Medium");
    } else {
      setPasswordFeedback("Strong");
    }
  }, [password]);

  // Handle OTP timer
  useEffect(() => {
    let interval: any;
    if (showOtpScreen && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpScreen, otpTimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpScreen(true);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otpCode[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpCode.join("");
    if (code.length < 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }
    alert(`Account verified successfully for ${name}! Redirecting to dashboard...`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      
      {/* Left side: Premium Branding & Testimonial Pane */}
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
           LearnGenie <span className="text-blue-500 font-medium text-sm px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 ml-1">LMS</span>
          </span>
        </div>

        {/* Feature Illustration and Pitch */}
        <div className="relative my-auto z-10 flex flex-col items-center">
          <div className="relative w-full max-w-[380px] p-6 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/60 shadow-2xl">
            <img
              src="https://illustrations.popsy.co/blue/study.svg"
              alt="Learning"
              className="w-full h-auto max-h-[220px] drop-shadow-[0_15px_30px_rgba(59,130,246,0.15)] transform hover:scale-[1.03] transition-transform duration-500 ease-out"
            />
            <div className="absolute -top-3 -right-3 bg-indigo-500 text-white rounded-lg p-2.5 shadow-lg shadow-indigo-500/20 animate-pulse">
              <Sparkles size={18} />
            </div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mt-10 tracking-tight text-center leading-snug">
            Empower Your Future through <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Immersive Learning
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-center text-base max-w-[420px] leading-relaxed">
            Gain access to industry-recognized courses, interactive hands-on coding sandboxes, and personal mentorship.
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
            <strong className="text-white">Join 15k+ Learners</strong> already upgrading their skills this week.
          </p>
        </div>
      </div>

      {/* Right side: Interactive Auth View */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[#090d16] relative">
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md z-10">
          
          {!showOtpScreen ? (
            /* Signup Screen */
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-extrabold text-white tracking-tight">
                  Get Started
                </h2>
                <p className="text-slate-400 mt-2 text-sm">
                  Create your EduVerse account in seconds.
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === "student"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    role === "teacher"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Instructor
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                  </div>
                </div>

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
                      placeholder="email@example.com"
                      className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-400">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Dynamic Password Strength Indicator */}
                  {password && (
                    <div className="mt-2.5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Security Strength</span>
                        <span className={`text-xs font-bold ${
                          passwordStrength <= 2 ? "text-rose-400" : passwordStrength <= 4 ? "text-amber-400" : "text-emerald-400"
                        }`}>
                          {passwordFeedback}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 1 ? (passwordStrength <= 2 ? "bg-rose-500" : passwordStrength <= 4 ? "bg-amber-500" : "bg-emerald-500") : "bg-transparent"}`}></div>
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 2 ? (passwordStrength <= 2 ? "bg-rose-500" : passwordStrength <= 4 ? "bg-amber-500" : "bg-emerald-500") : "bg-transparent"}`}></div>
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 3 ? (passwordStrength <= 4 ? "bg-amber-500" : "bg-emerald-500") : "bg-transparent"}`}></div>
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 4 ? (passwordStrength <= 4 ? "bg-amber-500" : "bg-emerald-500") : "bg-transparent"}`}></div>
                        <div className={`h-full flex-1 transition-all duration-300 ${passwordStrength >= 5 ? "bg-emerald-500" : "bg-transparent"}`}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 transition-colors group-focus-within:text-blue-400">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-blue-500" size={18} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-900/40 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions checkbox */}
                <label className="flex items-start gap-3 text-sm text-slate-400 cursor-pointer select-none py-1">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="peer h-5 w-5 appearance-none rounded-md border border-slate-800 bg-slate-900/40 checked:bg-blue-600 checked:border-blue-600 focus:outline-none cursor-pointer transition-colors"
                    />
                    <Check className="absolute text-white pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-200" size={14} strokeWidth={3} />
                  </div>
                  <span>
                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">Terms</a> and <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">Privacy Policy</a>
                  </span>
                </label>

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
                      Create Account <ArrowRight size={18} />
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
                    className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 font-medium py-3 px-4 rounded-xl transition duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.137 4.114-3.355 0-6.075-2.72-6.075-6.075s2.72-6.075 6.075-6.075c1.497 0 2.859.543 3.928 1.432l3.22-3.22C19.123 2.106 15.86 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.54 11.24-11.24 0-.768-.078-1.503-.22-2.2H12.24z"/>
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 font-medium py-3 px-4 rounded-xl transition duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1.27C5.37 1.27 0 6.64 0 13.17c0 5.22 3.47 9.65 8.3 11.2.6.11.82-.26.82-.57 0-.29-.01-1.05-.02-2.06-3.34.71-4.04-1.57-4.04-1.57-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.21.08 1.85 1.21 1.85 1.21 1.07 1.79 2.82 1.27 3.51.97.11-.76.42-1.27.76-1.56-2.67-.29-5.47-1.31-5.47-5.78 0-1.27.47-2.31 1.24-3.13-.12-.29-.54-1.48.12-3.08 0 0 .99-.31 3.25 1.18a11.5 11.5 0 0 1 6.01 0c2.25-1.49 3.24-1.18 3.24-1.18.67 1.6.25 2.79.13 3.08.77.82 1.24 1.86 1.24 3.13 0 4.49-2.81 5.48-5.49 5.77.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.22.69.83.57 4.82-1.56 8.29-5.99 8.29-11.21 0-6.53-5.37-11.9-12-11.9z"/>
                    </svg>
                    GitHub
                  </button>
                </div>

                {/* Login Redirect */}
                <p className="text-center text-slate-500 text-sm mt-6">
                  Already have an account?
                  <button
                    type="button"
                    onClick={onToggleView}
                    className="text-blue-400 hover:text-blue-300 font-bold ml-1.5 focus:outline-none"
                  >
                    Login
                  </button>
                </p>

              </form>
            </div>
          ) : (
            /* OTP Verification Screen */
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[50px] pointer-events-none"></div>

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/5 text-blue-500">
                  <Smartphone size={28} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Verify Your Email
                </h2>
                <p className="text-slate-400 mt-2 text-sm max-w-[320px] mx-auto leading-relaxed">
                  We've sent a 6-digit verification code to <strong className="text-slate-200">{email}</strong>.
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {/* OTP Input Grid */}
                <div className="flex justify-between gap-2.5">
                  {otpCode.map((val, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 bg-slate-900/50 border border-slate-800 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                    />
                  ))}
                </div>

                {/* OTP Validation Status */}
                <div className="flex justify-between items-center text-sm px-1">
                  <span className="text-slate-500">Didn't receive the code?</span>
                  {otpTimer > 0 ? (
                    <span className="text-blue-400 font-semibold">Resend in {otpTimer}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOtpTimer(59)}
                      className="text-blue-400 hover:text-blue-300 font-bold"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-blue-500/10"
                  >
                    <ShieldCheck size={20} /> Verify Account
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOtpScreen(false)}
                    className="w-full border border-slate-800 hover:border-slate-700 bg-transparent text-slate-400 hover:text-slate-200 py-3.5 px-4 rounded-xl font-bold transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Signup;