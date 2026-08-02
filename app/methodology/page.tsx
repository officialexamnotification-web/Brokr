import { Metadata } from "next";
import { Database, ExternalLink, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology and Data Status | Brokr",
  description: "How Brokr structures trading-tool listings, sources, comparison fields, and verification status.",
};

export default function MethodologyPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Methodology and Data Status</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Brokr is an informational directory. It organizes provider information for discovery and comparison; it does not rank, endorse, or independently verify every listing.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/20 p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No proprietary score</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ratings, review counts, “best” labels, and hidden scoring are not used. A comparison is a side-by-side presentation of the fields available in each record.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Listing fields</h2>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li><strong>Provider details:</strong> name, category, website, features, pricing notes, platforms, and availability fields.</li>
              <li><strong>Country context:</strong> a listing may describe a provider’s stated coverage, not guaranteed legal availability for every user.</li>
              <li><strong>Regulation:</strong> regulatory names are displayed as record data; users should confirm the exact legal entity and licence with the regulator.</li>
              <li><strong>Provenance:</strong> provider URLs are shown where available. A missing verification date means no independent verification date is recorded.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to use a listing</h2>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-slate-600 dark:text-slate-400">
              <li>Open the provider website from the listing and check current fees, terms, and availability.</li>
              <li>Confirm the legal entity and licence in the relevant regulator’s official register.</li>
              <li>Compare the same account type, currency, instrument, and country before drawing conclusions.</li>
              <li>Do your own research. Trading and investing involve risk, and this directory is not financial advice.</li>
            </ol>
          </section>

          <section className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Scale className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Comparison language</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Brokr uses neutral labels such as “related listing” and “available fields.” It does not present a universal winner because the right choice depends on the user’s jurisdiction, needs, and risk tolerance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
