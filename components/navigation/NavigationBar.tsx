"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthDialog } from "@/components/auth/AuthDialog";
import { useAuth } from "@/components/providers/AuthProvider";

export function NavigationBar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuError, setMenuError] = useState<string | null>(null);
  const accountControlRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (user) {
      setDialogOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleClickAway = (event: MouseEvent) => {
      if (
        accountControlRef.current &&
        !accountControlRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [menuOpen]);

  const handleIconClick = () => {
    if (user) {
      setMenuOpen((current) => !current);
      setMenuError(null);
    } else {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSignOut = async () => {
    setMenuError(null);
    try {
      await signOut();
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign out right now.";
      setMenuError(message);
    }
  };

  const helperText = user?.email
    ? user.email
    : loading
    ? "Loading..."
    : "Healthy choices made simple";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.25)] backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <span className="text-lg font-semibold tracking-tight text-neutral-800">
            mmhealth
          </span>
          <div className="flex items-center gap-3">
            <span className="max-w-[150px] truncate text-sm text-neutral-500 sm:max-w-none sm:text-base">
              {helperText}
            </span>
            <div className="relative" ref={accountControlRef}>
              <button
                type="button"
                onClick={handleIconClick}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                aria-haspopup={user ? "menu" : "dialog"}
                aria-expanded={user ? menuOpen : dialogOpen}
                aria-label={user ? "Account menu" : "Open login dialog"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.314 0-6 2.239-6 5 0 .553.448 1 1 1h10c.552 0 1-.447 1-1 0-2.761-2.686-5-6-5Z"
                  />
                </svg>
              </button>

              {menuOpen && user && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-neutral-100 bg-white p-2 text-sm shadow-lg">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full rounded-lg px-3 py-2 text-left font-medium text-neutral-600 transition hover:bg-emerald-50 hover:text-neutral-900"
                  >
                    Sign out
                  </button>
                  {menuError && (
                    <p className="mt-2 text-xs text-rose-500">{menuError}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}
