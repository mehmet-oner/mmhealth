"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

type AuthDialogProps = {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
};

type AuthMode = "signin" | "signup";

type StatusMessage = {
  type: "error" | "success";
  message: string;
};

export function AuthDialog({ open, onClose, initialMode = "signin" }: AuthDialogProps) {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setStatus(null);
      setSubmitting(false);
      setPassword("");
      return;
    }

    setMode(initialMode);
  }, [open, initialMode]);

  if (!open) {
    return null;
  }

  const title =
    mode === "signin" ? "Sign in to mmhealth" : "Create your mmhealth account";

  const toggleLinkLabel =
    mode === "signin" ? "Create a new account" : "Already have an account? Sign in";

  const handleToggleMode = () => {
    setMode((current) => (current === "signin" ? "signup" : "signin"));
    setStatus(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      if (mode === "signin") {
        await signIn({ email, password });
        onClose();
        router.push("/dashboard");
      } else {
        await signUp({ email, password });
        setStatus({
          type: "success",
          message: "Check your email to verify your account before signing in.",
        });
        setMode("signin");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {mode === "signin"
                ? "Enter your credentials to continue."
                : "We will send a verification email before your first sign in."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-neutral-400 transition hover:text-neutral-700"
            aria-label="Close login dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-neutral-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="••••••••"
              minLength={6}
            />
          </label>

          {status && (
            <p
              className={`text-sm ${
                status.type === "error" ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting
              ? mode === "signin"
                ? "Signing in..."
                : "Creating account..."
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleToggleMode}
          className="mt-4 w-full text-center text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
        >
          {toggleLinkLabel}
        </button>
      </div>
    </div>
  );
}
