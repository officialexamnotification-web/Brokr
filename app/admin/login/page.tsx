"use client";

import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Moon, ShieldCheck, Sun } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/admin");
    });
  }, [router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase is not configured for this deployment.");
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/admin");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message.replace("Firebase: ", "") : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-slate-950 sm:py-16">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-violet-500 to-cyan-400 text-lg font-black text-white shadow-lg shadow-primary-500/20">T</div>
              <div><p className="text-base font-black tracking-tight text-slate-900 dark:text-white">Tradivex</p><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Admin Studio</p></div>
            </div>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-500 transition hover:border-primary-300 hover:text-primary-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
          </div>
          <div className="glass-card rounded-[2rem] p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-950/50 dark:text-primary-300"><ShieldCheck className="h-5 w-5" /></div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary-600">Private access</p>
            <h1 className="gradient-text mt-3 text-3xl font-black">Tradivex Admin</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">Manage tools, submissions and editorial content from your secure workspace.</p>
            {!isFirebaseConfigured && <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">Firebase configuration is missing.</div>}
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Admin email</span><input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="input-modern" placeholder="admin@example.com" /></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-modern" /></label>
              {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">{error}</p>}
              <button disabled={busy || !isFirebaseConfigured} className="btn-primary w-full !rounded-xl !py-3 disabled:cursor-not-allowed disabled:opacity-50">{busy ? "Signing in…" : "Sign in securely"}</button>
            </form>
            <div className="mt-6 flex gap-3 rounded-2xl bg-slate-100/80 p-4 dark:bg-slate-900/70"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">This admin route is intentionally hidden from the public navigation. Your Firebase account must also be enabled in <code className="text-slate-700 dark:text-slate-300">admins/&lt;your-email&gt;</code>.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
