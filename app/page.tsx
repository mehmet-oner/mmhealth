"use client";

import { useState } from "react";

import { AuthDialog } from "@/components/auth/AuthDialog";

const highlights = [
  {
    title: "Personalized meal insights",
    description:
      "Log your meals in seconds and see balanced plate suggestions tailored to your goals.",
  },
  {
    title: "Mindful reminders",
    description:
      "Schedule gentle nudges that keep hydration, snacks, and nutrition top of mind.",
  },
  {
    title: "Progress at a glance",
    description:
      "Visualize trends, celebrate wins, and adjust quickly with intuitive dashboards.",
  },
];

export default function Home() {
  const [createAccountOpen, setCreateAccountOpen] = useState(false);

  const handleOpenSignup = () => {
    setCreateAccountOpen(true);
  };

  const handleCloseSignup = () => {
    setCreateAccountOpen(false);
  };

  return (
    <>
      <div className="space-y-10 pb-10">
        <section className="rounded-3xl bg-gradient-to-br from-white via-white to-emerald-50/40 p-8 shadow-[0_25px_60px_-40px_rgba(45,140,105,0.65)] ring-1 ring-emerald-100/60 sm:p-12">
          <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Healthy eating
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-800 sm:text-4xl">
            Eating well made effortless.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
            mmhealth keeps your plate balanced with quick meal logging, evidence-based guidance,
            and mindful reminders that flex with your day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleOpenSignup}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              Start meal planning
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {highlights.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-neutral-100 bg-white/90 p-6 text-left shadow-[0_12px_40px_-30px_rgba(15,23,42,0.45)]"
            >
              <h2 className="text-base font-semibold text-neutral-800">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>

      <AuthDialog
        open={createAccountOpen}
        onClose={handleCloseSignup}
        initialMode="signup"
      />
    </>
  );
}
