"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { signInWithEmail, signOut, signUpWithEmail } from "@/lib/auth";
import { supabaseClient } from "@/lib/supabaseClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type AuthMode = "signin" | "signup";

const authRedirectTo = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.origin;
};

export function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authParam = searchParams.get("auth");

  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabaseClient.auth.getSession();

      if (isMounted) {
        setSession(currentSession);
      }
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_, updatedSession) => {
      setSession(updatedSession);
    });

    getSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setAuthError(null);
    const { error } = await signOut();

    if (error) {
      setAuthError(error.message);
    }

    setIsSigningOut(false);
  };

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setShowAuth(true);
    setAuthError(null);
    setFeedbackMessage(null);
    setPassword("");
    if (mode === "signin") {
      setUsername("");
    }
  };

  const closeAuthModal = () => {
    setShowAuth(false);
    setAuthError(null);
    setFeedbackMessage(null);
    setPassword("");
    setEmail("");
    setUsername("");
    if (searchParams.get("auth")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  };

  useEffect(() => {
    if (authParam !== "signin" && authParam !== "signup") {
      return;
    }

    setAuthMode(authParam);
    setShowAuth(true);
    setAuthError(null);
    setFeedbackMessage(null);
    setPassword("");

    if (authParam === "signin") {
      setUsername("");
    }
  }, [authParam]);

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);
    setFeedbackMessage(null);

    try {
      if (authMode === "signup") {
        const redirectTo = authRedirectTo();
        const { error } = await signUpWithEmail({
          email: email.trim().toLowerCase(),
          password,
          username: username.trim() || undefined,
          redirectTo,
        });

        if (error) {
          setAuthError(error.message);
          return;
        }

        setFeedbackMessage(
          "Check your inbox for a verification link to complete your signup."
        );
        setPassword("");
      } else {
        const { error } = await signInWithEmail({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          setAuthError(error.message);
          return;
        }

        closeAuthModal();
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setAuthError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 shadow-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold uppercase text-white">
            mm
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            mmhealth
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden text-xs font-medium text-slate-500 sm:inline">
                {session.user.user_metadata?.username || session.user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSigningOut}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="rounded-full border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Create account
              </button>
            </>
          )}
        </div>
      </nav>
      {authError && !showAuth ? (
        <div className="bg-red-50 px-4 py-2 text-center text-xs font-medium text-red-600">
          {authError}
        </div>
      ) : null}
      {showAuth ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900">
                  {authMode === "signin" ? "Welcome back" : "Create your account"}
                </h2>
                <p className="text-xs text-slate-500">
                  {authMode === "signin"
                    ? "Enter your email to access your personalized plans."
                    : "We will send a verification email to activate your account."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <span aria-hidden>×</span>
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleAuthSubmit}>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="you@example.com"
                />
              </label>
              {authMode === "signup" ? (
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Username
                  </span>
                  <input
                    required
                    minLength={2}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="Choose a username"
                  />
                </label>
              ) : null}
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Password
                </span>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Min. 6 characters"
                />
              </label>
              {authError ? (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                  {authError}
                </p>
              ) : null}
              {feedbackMessage ? (
                <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                  {feedbackMessage}
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : authMode === "signin"
                  ? "Sign in"
                  : "Send verification"}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-500">
              {authMode === "signin" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => openAuthModal("signup")}
                    className="font-semibold text-emerald-600 underline-offset-2 hover:underline"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already joined?{" "}
                  <button
                    type="button"
                    onClick={() => openAuthModal("signin")}
                    className="font-semibold text-emerald-600 underline-offset-2 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
