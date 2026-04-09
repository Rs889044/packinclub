"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-charcoal via-[#1a2e1a] to-brand-charcoal px-5">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C20 5 10 20 10 35s10 20 20 20c5 0 10-5 15-15' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image src="/images/logo.png" alt="Packin Club" width={180} height={37} className="h-9 w-auto brightness-0 invert mx-auto mb-4" />
          <p className="text-white/50 text-sm">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
          <h1 className="font-display text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/50 text-sm mb-8">Enter your admin password to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:border-brand-leaf focus:ring-2 focus:ring-brand-leaf/20 outline-none text-sm transition-all"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-brand-forest text-white font-semibold rounded-xl hover:bg-brand-green transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-brand-forest/20"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          &copy; {new Date().getFullYear()} Packin Club. Secure admin access.
        </p>
      </div>
    </div>
  );
}
