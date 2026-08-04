import { Metadata } from "next";
import Link from "next/link";
import { calculatorDefinitions } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Trading Calculators | Tradivex",
  description: "Explore Tradivex's free, input-driven trading calculators for forex, options, brokerage costs, and technical levels.",
};

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-3">Tradivex Tools</p>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-5">Free trading calculators</h1>
        <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400 mb-10">
          Use your own assumptions to estimate pip value, position size, profit and loss, margin, options payoff, trading costs, risk, returns, average price, drawdown, and pivot levels. Results are educational estimates, not financial advice.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {calculatorDefinitions.map((calculator) => (
            <Link key={calculator.slug} href={`/calculators/${calculator.slug}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">{calculator.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{calculator.description}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-primary-600">Open calculator →</span>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
          Always verify current broker fees, leverage, contract specifications, taxes, and execution conditions directly with the applicable provider. A calculator output is not a prediction or a recommendation.
        </div>
      </div>
    </main>
  );
}
