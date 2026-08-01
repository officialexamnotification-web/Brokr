import { Metadata } from "next";
import { ShieldCheck, Users, Target, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Brokr",
  description: "Learn about Brokr - your trusted platform for comparing trading tools, brokers, and exchanges. Our mission is to help you make informed financial decisions.",
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
          Your trusted companion in navigating the complex world of trading platforms, brokers, and financial tools.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Our Mission
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            At Brokr, we believe everyone deserves access to clear, unbiased information when choosing financial trading platforms. Our mission is to simplify the complex landscape of brokers, exchanges, and trading tools by providing comprehensive comparisons and transparent information. We're committed to helping traders of all levels make informed decisions that align with their financial goals and risk tolerance.
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
              <p className="text-sm text-slate-600 dark:text-slate-400">We clearly disclose our affiliate relationships and never let commissions influence our comparisons.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Independence</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Our editorial content is separate from commercial partnerships. We maintain strict editorial independence.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Accuracy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">We continuously update our data and verify information from official sources to ensure accuracy.</p>
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
            Brokr was founded by a team who recognized the need for a better way to compare trading platforms. We've experienced firsthand the frustration of navigating conflicting information, hidden fees, and biased reviews. Our team combines knowledge of financial markets with technical expertise to build tools that genuinely help traders.
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
                <p className="text-sm text-slate-600 dark:text-slate-400">We use objective criteria like regulation, fees, platforms, and asset coverage rather than subjective ratings.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Regulatory Focus</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">We prioritize regulatory compliance and trust, helping you identify platforms that meet strict safety standards.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 dark:text-primary-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Continuous Updates</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Financial markets change rapidly. We regularly update our information to reflect current conditions.</p>
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
