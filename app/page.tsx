import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";

const features = [
  {
    title: "Personalized nutrition",
    description:
      "Adaptive meal plans tailored to your goals, habits, and dietary preferences.",
  },
  {
    title: "Smart grocery lists",
    description:
      "Automated grocery planning that keeps your kitchen stocked with wholesome staples.",
  },
  {
    title: "Real-time guidance",
    description:
      "Stay on track with gentle reminders, expert tips, and progress check-ins.",
  },
];

const highlights = [
  {
    label: "Recipes",
    value: "1k+",
  },
  {
    label: "Nutrition coaches",
    value: "150",
  },
  {
    label: "Success rate",
    value: "92%",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Suspense fallback={<div className="h-14" aria-hidden />}>
        <Navbar />
      </Suspense>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-4 pb-16 pt-12 sm:pt-16">
        <section className="flex flex-col gap-8 rounded-3xl bg-white p-8 shadow-sm sm:p-12">
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Nourish your day
          </span>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Healthy eating made effortless
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              mmhealth helps you build sustainable habits through curated meal plans,
              mindful guidance, and a supportive community focused on feeling your best.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-600"
            >
              Explore features
            </a>
            <Link
              href="/?auth=signup"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-6 py-3 text-sm font-semibold text-emerald-600 transition hover:border-emerald-500 hover:text-emerald-700"
            >
              Create account
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-slate-100 p-6 text-sm text-slate-600 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-start justify-center rounded-xl bg-white p-4 shadow-sm"
              >
                <span className="text-2xl font-semibold text-emerald-600">{item.value}</span>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="space-y-8">
          <header className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">What you will love</h2>
            <p className="text-sm text-slate-600">
              Designed for busy lifestyles, mmhealth keeps nutrition simple with smart
              automations that adapt as you grow.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="community"
          className="flex flex-col gap-6 rounded-3xl bg-emerald-600 p-8 text-white sm:flex-row sm:items-center sm:p-12"
        >
          <div className="space-y-3 sm:w-2/3">
            <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
              Join a vibrant community of mindful eaters
            </h2>
            <p className="text-sm text-emerald-100 sm:text-base">
              Access live workshops, weekly challenges, and supportive coaches that make
              healthy eating feel natural.
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-3 text-sm">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-sm leading-relaxed text-emerald-50">
                &ldquo;mmhealth has helped me feel confident in my food choices and energized all
                day long.&rdquo;
              </p>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-wide text-emerald-200">
                — Maya, member since 2023
              </span>
            </div>
            <Link
              href="/?auth=signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-600 shadow transition hover:bg-emerald-100"
            >
              Start your journey
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white/80 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} mmhealth. Nourish what matters most.
      </footer>
    </div>
  );
}
