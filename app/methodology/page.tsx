import { Metadata } from "next";
import { Scale, Shield, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Methodology - How We Compare Brokers | Brokr",
  description: "Learn about our broker comparison methodology based on industry-standard 5-axis framework: regulation, costs, platforms, asset coverage, and support.",
};

export default function MethodologyPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Comparison Methodology
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  Industry-Standard Framework
                </h3>
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  Our comparison methodology is based on the 5-axis framework used by leading broker comparison sites in the industry.
                </p>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              The 5-Axis Comparison Framework
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              We evaluate brokers and trading platforms across five key criteria. Each axis is scored independently, and the overall ranking is a weighted average based on the user profile (beginner, active trader, long-term investor).
            </p>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Axis 1: Regulation & Trust
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight: 30%</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 dark:text-slate-400">
                  <p><strong>What we measure:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Regulatory tier (Tier-1, Tier-2, Other)</li>
                    <li>• Number of regulatory licenses</li>
                    <li>• Operating history and track record</li>
                    <li>• Investor compensation scheme membership</li>
                  </ul>
                  <p className="mt-3"><strong>Scoring:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Tier-1 regulators (FCA, SEC, FINRA, ASIC, etc.): 30 points each</li>
                    <li>• Tier-2 regulators (FSCA, DFSA, CySEC, etc.): 15 points each</li>
                    <li>• Other regulators: 5 points each</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Axis 2: Total Cost
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight: 25%</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 dark:text-slate-400">
                  <p><strong>What we measure:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Minimum deposit requirements</li>
                    <li>• Trading spreads and commissions</li>
                    <li>• Overnight financing fees (swap rates)</li>
                    <li>• Inactivity and withdrawal fees</li>
                    <li>• Currency conversion costs</li>
                  </ul>
                  <p className="mt-3"><strong>Note:</strong> We model costs against realistic trading profiles rather than relying on headline spreads alone.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Axis 3: Platforms & Execution
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight: 20%</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 dark:text-slate-400">
                  <p><strong>What we measure:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Web and desktop platform quality</li>
                    <li>• Mobile app availability and features</li>
                    <li>• Third-party platform support (MT4, MT5, cTrader)</li>
                    <li>• Order types and execution quality</li>
                    <li>• Demo account availability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Axis 4: Asset Coverage
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight: 15%</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 dark:text-slate-400">
                  <p><strong>What we measure:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Available asset classes (stocks, ETFs, forex, crypto, etc.)</li>
                    <li>• Number of tradable instruments</li>
                    <li>• Exchange coverage</li>
                    <li>• Special features (fractional shares, IPO access, etc.)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Axis 5: Support & Operations
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Weight: 10%</p>
                  </div>
                </div>
                <div className="space-y-3 text-slate-600 dark:text-slate-400">
                  <p><strong>What we measure:</strong></p>
                  <ul className="space-y-2 ml-4">
                    <li>• Deposit and withdrawal options</li>
                    <li>• Customer support channels and hours</li>
                    <li>• KYC verification speed</li>
                    <li>• Educational resources quality</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              User Profile-Based Weighting
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The importance of each axis varies depending on the user profile:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li><strong>Beginners:</strong> Higher weight on regulation, support, and platform usability</li>
                <li><strong>Active Traders:</strong> Higher weight on costs, execution quality, and platform features</li>
                <li><strong>Long-term Investors:</strong> Higher weight on regulation, asset coverage, and costs</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Data Sources & Verification
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our data is sourced from:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>• Official broker websites and fee schedules</li>
                <li>• Regulatory authority registers (FCA, ASIC, etc.)</li>
                <li>• Independent third-party reviews and comparisons</li>
                <li>• Direct broker communications for verification</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                We update our data quarterly and whenever significant changes occur in broker offerings.
              </p>
            </div>
          </section>

          <section className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Independence & Transparency
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our methodology is designed to ensure fair, unbiased comparisons. We do not:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>• Accept payment to improve broker rankings</li>
                <li>• Allow brokers to influence our scoring criteria</li>
                <li>• Exclude brokers based on commercial relationships</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                For information about our commercial relationships, please see our <a href="/affiliate-disclosure" className="text-primary-600 dark:text-primary-400 hover:underline">Affiliate Disclosure</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
