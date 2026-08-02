import { Metadata } from "next";
import { ShieldCheck, Users, Target, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Brokr",
  description: "Learn how Brokr organizes trading tools, brokers, exchanges, and educational resources for informational comparison.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
          About <span className="text-primary-600">Brokr</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          An informational directory for discovering and comparing trading platforms, brokers, exchanges, and financial tools.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Our Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Brokr organizes provider information into searchable listings so users can compare documented fields in one place. The site does not provide financial advice, choose a provider for a user, or guarantee that a listing is current or available in every country.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary-600" />
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Transparency</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Provider links and any future commercial relationships are disclosed clearly.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Independence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Listings use neutral comparison language and do not show user ratings or a universal winner.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Accuracy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Each listing exposes its source and verification status when those fields are recorded.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">User-Centric</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Everything we do is designed to help you make better decisions.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-600" />
            Who We Are
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Brokr is a software project focused on making a large set of provider listings easier to search. The directory is not operated as a broker, adviser, consultant, or investment service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary-600" />
            Our Approach
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Data-Driven Comparisons</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">We show fields such as regulation, fees, platforms, and asset coverage without turning incomplete data into a score.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Regulatory Focus</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">We display regulatory fields for context; users must confirm the legal entity and licence with the relevant regulator.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Continuous Updates</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Financial information changes rapidly. Check the provider and regulator directly, especially where a verification date is missing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-8 rounded-3xl bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-950/30 dark:to-indigo-950/30 border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Disclaimer</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Brokr is an informational and comparison platform only. We do not provide financial advice, investment recommendations, or brokerage services. Trading financial instruments involves significant risk and may result in the loss of your invested capital. You should always conduct your own research and consult with qualified financial advisors before making investment decisions. While we strive for accuracy, we cannot guarantee the completeness or timeliness of information presented on this platform.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
