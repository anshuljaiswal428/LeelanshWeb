"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-wine-deep px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-3xl bg-cream p-8 shadow-2xl"
      >
        <p className="font-serif text-3xl font-black text-wine">
          {site.brand}<span className="text-gold">.</span>
        </p>
        <h1 className="mt-4 font-serif text-2xl font-bold text-wine-deep">Admin Login</h1>
        <p className="mt-1 text-sm text-ink/60">Enter your admin password to manage the site.</p>

        <label className="mt-6 block text-sm font-semibold text-ink/80">Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-wine/20 bg-white px-4 py-3 text-ink outline-none focus:border-wine"
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-wine py-3 font-semibold text-white transition-colors hover:bg-wine-deep disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <a href="/" className="mt-4 block text-center text-sm text-ink/50 hover:text-wine">
          ← Back to website
        </a>
      </form>
    </main>
  );
}
