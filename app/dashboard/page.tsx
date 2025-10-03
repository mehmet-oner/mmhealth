"use client";

import Link from "next/link";

import { useAuth } from "@/components/providers/AuthProvider";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email || "there";

  if (loading) {
    return (
      <div className="space-y-10 pb-10">
        <section className="rounded-3xl border border-emerald-100 bg-white/70 p-8 text-center shadow-[0_25px_60px_-40px_rgba(45,140,105,0.65)] sm:p-12">
          <p className="text-lg font-medium text-neutral-600">Loading your personalized dashboard…</p>
        </section>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-10 pb-10">
        <section className="rounded-3xl border border-neutral-100 bg-white/90 p-8 text-center shadow-[0_25px_60px_-40px_rgba(15,23,42,0.25)] sm:p-12">
          <h1 className="text-2xl font-semibold text-neutral-800">You&apos;re signed out</h1>
          <p className="mt-3 text-sm text-neutral-500">
            Head back to the home page to sign in and access your dashboard.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            Return home
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      <section className="rounded-3xl bg-gradient-to-br from-white via-white to-emerald-50/60 p-8 shadow-[0_25px_60px_-40px_rgba(45,140,105,0.65)] ring-1 ring-emerald-100/60 sm:p-12">
        <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Welcome back
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl">
          Hi {displayName}, let&apos;s plan your next meal.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
          This personalized space will surface today&apos;s goals, nutrition trends, and mindful reminders once data is connected.
          For now, explore a few starter actions below.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-neutral-100 bg-white/95 p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="text-base font-semibold text-neutral-800">Log a meal</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Keep track of breakfast, lunch, and dinner with quick entry shortcuts and balanced plate suggestions.
          </p>
        </article>
        <article className="rounded-2xl border border-neutral-100 bg-white/95 p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="text-base font-semibold text-neutral-800">Review insights</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Visualize emerging patterns, hydration stats, and mindful wins to stay motivated throughout the week.
          </p>
        </article>
        <article className="rounded-2xl border border-neutral-100 bg-white/95 p-6 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)]">
          <h2 className="text-base font-semibold text-neutral-800">Set reminders</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Schedule gentle nudges across meals, snacks, and check-ins so healthy habits stay effortless.
          </p>
        </article>
      </section>
    </div>
  );
}
