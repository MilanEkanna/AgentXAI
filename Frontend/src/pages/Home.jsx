import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";
import { useSelector } from "react-redux";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {userData} = useSelector(state=>state.user)

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      console.log("data", data);
    } catch (err) {
      console.log("Error in login", err);
    }
  };

  const googleLogin = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await signInWithPopup(auth, googleProvider);
    const token = await data.user.getIdToken();
    await handleLogin(token);
  } catch (err) {
    if (err.code === "auth/popup-closed-by-user") {
      setError("Sign-in was cancelled.");
    } else if (err.code === "auth/cancelled-popup-request") {
      // fired when a second popup is triggered before the first resolves — safe to ignore
    } else {
      console.log("Error during google login", err);
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#08090d] text-white flex items-center justify-center px-4">
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(245,183,84,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(91,140,255,0.06), transparent 45%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[380px] rounded-2xl border border-white/[0.08] bg-[#101218]/90 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] p-8 flex flex-col gap-6 animate-[fadeUp_0.5s_ease-out]">
        {/* Signature: agent pulse core */}
        <div className="flex justify-center">
          <div className="relative h-12 w-12 flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#f5b754]/20 agent-ping" />
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-[#f5b754]/15" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#f5b754] shadow-[0_0_12px_2px_rgba(245,183,84,0.6)]" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-[10px] tracking-[0.18em] text-[#f5b754]/80 uppercase">
            Agentx-AI · Secure sign-in
          </span>
          <h2
            className="text-[22px] font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
          >
            Welcome back
          </h2>
          <p className="text-[13.5px] leading-relaxed text-white/50 max-w-[260px]">
            Sign in to continue to your workspace and pick up where you left off.
          </p>
        </div>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="group relative w-full flex items-center justify-center gap-3 rounded-xl bg-white text-[#1a1a1a] font-medium text-[14px] py-3 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:shadow-[0_8px_24px_-6px_rgba(255,255,255,0.25)] active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b754] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101218] cursor-pointer"
        >
          {loading ? (
            <span className="h-4 w-4 rounded-full border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] animate-spin" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.4 0-13.8 3.9-17.7 9.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.5 0 10.5-1.9 14.3-5.1l-6.6-5.6C29.6 34.9 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.9 39.9 16.4 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.5 5.7l6.6 5.6C41.4 36.1 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z"
              />
            </svg>
          )}
          <span>{loading ? "Signing in…" : "Continue with Google"}</span>
        </button>

        <p className="text-center text-[11.5px] text-white/30 leading-relaxed">
          By continuing, you agree to Agentx-AI's{" "}
          <span className="text-white/50 hover:text-[#f5b754] transition-colors cursor-pointer">
            Terms
          </span>{" "}
          and{" "}
          <span className="text-white/50 hover:text-[#f5b754] transition-colors cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes agentPing {
          0% { transform: scale(0.8); opacity: 0.6; }
          70%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .agent-ping {
          animation: agentPing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .agent-ping { animation: none; }
          * { animation-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;