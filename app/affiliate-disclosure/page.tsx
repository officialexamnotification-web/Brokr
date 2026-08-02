import { Metadata } from "next";
import { AlertTriangle, ExternalLink, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Brokr",
  description: "Brokr’s current affiliate status and how commercial links will be disclosed if they are added.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Affiliate Disclosure</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
          This page describes the current commercial-link status of the directory.
        </p>

        <div className="space-y-8">
          <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Current status</h2>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Affiliate partnerships and commission tracking are not currently connected in this project. A provider link should be treated as a direct informational link unless the page clearly says otherwise.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What this means</h2>
            </div>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li>Brokr is an informational directory, not a broker, adviser, or financial service provider.</li>
              <li>Listings are not endorsements, recommendations, or guarantees of safety, legality, pricing, or availability.</li>
              <li>If commercial links are added later, each relevant page will identify them near the link and this disclosure will be updated.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Check the provider directly</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Before opening an account, review the provider’s current terms, fees, country restrictions, legal entity, and regulator record. Information can change after a listing is published.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
