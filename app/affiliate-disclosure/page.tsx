import { Metadata } from "next";
import { AlertTriangle, Scale, Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - Brokr",
  description: "Learn about our affiliate relationships and how we maintain editorial independence in our broker comparisons and reviews.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Affiliate Disclosure
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Important Notice
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  This disclosure applies to all pages on Brokr that contain affiliate links to trading platforms, brokers, or financial service providers.
                </p>
              </div>
            </div>
          </div>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                How We Make Money
              </h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Brokr is an independent comparison platform designed to help users compare trading tools efficiently without visiting multiple websites. Our primary goal is to provide unbiased comparisons that assist users in making informed decisions about trading platforms.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We may include affiliate links in the future to support our operations. If and when we implement affiliate partnerships, we will clearly disclose such relationships and ensure that our comparisons remain unbiased and independent.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Any future affiliate commissions would not affect the cost to users. The pricing, fees, and terms offered by brokers would remain the same whether accessed through our site or directly.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Editorial Independence
              </h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Our editorial team operates independently of any commercial discussions with brokers. To maintain transparency and trust:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span>No broker can pay to improve, alter, or influence their ranking position in our comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span>We do not accept payment to write positive reviews or omit negative findings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span>We do not share our editorial review process with brokers before publication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span>We review platforms that do not have affiliate relationships with us if they deserve inclusion based on our criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span>Our comparison methodology is published and available for review on our Methodology page</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Our Comparison Methodology
              </h2>
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We compare brokers and trading platforms using a standardized 5-axis framework based on industry best practices:
              </p>
              <ol className="space-y-2 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                <li><strong>Regulation & Trust:</strong> Tier-based scoring of regulatory licenses (Tier-1, Tier-2, Other)</li>
                <li><strong>Total Cost:</strong> Analysis of fees, spreads, commissions, and minimum deposits</li>
                <li><strong>Platforms & Execution:</strong> Evaluation of trading platforms, mobile apps, and order types</li>
                <li><strong>Asset Coverage:</strong> Assessment of available instruments and markets</li>
                <li><strong>Support & Operations:</strong> Review of deposit/withdrawal options and customer support</li>
              </ol>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                For detailed information about our scoring system, please visit our <a href="/methodology" className="text-primary-600 dark:text-primary-400 hover:underline">Methodology page</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Regulatory Compliance
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                This disclosure and our practices are designed to comply with:
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>• FTC Endorsement Guides (United States)</li>
                <li>• FCA Consumer Duty requirements (United Kingdom)</li>
                <li>• ASIC Regulatory Guide 234 (Australia)</li>
                <li>• EU Unfair Commercial Practices Directive (UCPD)</li>
              </ul>
            </div>
          </section>

          <section className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Questions?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              If you have questions about our affiliate relationships or how we maintain editorial independence, please contact us through our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
