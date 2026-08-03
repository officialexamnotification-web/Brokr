import { Metadata } from "next";
import { FileText, AlertTriangle, Scale, Gavel } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Brokr",
  description: "Brokr's Terms of Service - Read our terms and conditions for using our website and services. By using Brokr, you agree to these terms.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Terms of <span className="text-primary-600">Service</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Last updated: August 3, 2026
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            Agreement to Terms
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            By accessing or using Brokr ("the Service"), you acknowledge these Terms of Service ("Terms"). If you do not agree with them, please do not use the Service. These Terms describe the intended conditions for using this informational directory; their enforceability may depend on applicable law and the operator's actual legal details.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-primary-600" />
            Disclaimer of Financial Advice
          </h2>
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 mb-4">
            <p className="text-slate-800 dark:text-slate-200 font-semibold mb-2">IMPORTANT NOTICE</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Brokr is an informational and comparison platform only. We do NOT provide financial advice, investment recommendations, or brokerage services. All content on this website is for informational purposes only and should not be construed as professional financial advice.
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Trading financial instruments involves significant risk and may result in the loss of your invested capital. You should always conduct your own research, carefully consider your investment objectives, and consult with qualified financial advisors before making any investment decisions. Past performance is not indicative of future results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary-600" />
            Nature of Service
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Brokr provides:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Comparisons of trading platforms, brokers, and exchanges</li>
            <li>Information about financial tools and services</li>
            <li>Educational content about trading and investing</li>
            <li>Links to third-party financial service providers</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            We do not execute trades, hold client funds, or provide investment management services. Any transactions you make are directly with third-party brokers or exchanges, not with Brokr.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Accuracy of Information</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website. Financial information, fees, and regulations change frequently. Always verify current terms directly with service providers before making decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Affiliate Relationships</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Affiliate partnerships and commission tracking are not currently connected in this project. If that changes, the relevant links and the Affiliate Disclosure page will be updated before they are used commercially.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Provider links are informational and do not constitute endorsements or recommendations. For the current commercial-link status, please review our Affiliate Disclosure page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Responsibilities</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            As a user of Brokr, you agree to:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Use the Service for lawful purposes only</li>
            <li>Not attempt to gain unauthorized access to our systems</li>
            <li>Not use automated tools to scrape or harvest data</li>
            <li>Not reproduce or redistribute our content without permission</li>
            <li>Provide accurate information when submitting forms</li>
            <li>Conduct your own due diligence before making financial decisions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Third-Party Links</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our website contains links to third-party websites. We are not responsible for the content, policies, or practices of these third-party sites. Your interactions with third-party websites are governed by their terms of service and privacy policies. We encourage you to review these policies before providing personal information or engaging in transactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            To the maximum extent permitted by law, Brokr shall not be liable for:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Any indirect, incidental, special, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Decisions you make based on information from our Service</li>
            <li>Actions or omissions of third-party service providers</li>
            <li>Technical errors or interruptions in Service availability</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            In no event shall our total liability exceed the amount you paid, if any, for accessing our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Gavel className="w-6 h-6 text-primary-600" />
            Intellectual Property
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Original text, software, and branding created for Brokr may be owned by Brokr or its licensors and may be protected by intellectual-property laws. Provider names, trademarks, logos, and third-party materials remain the property of their respective owners. You may not reproduce Brokr-owned content without permission, except as permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Indemnification</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            You agree to indemnify and hold harmless Brokr, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the Service, your violation of these Terms, or your violation of any rights of another party.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Termination</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice. Upon termination, your right to use the Service will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Governing Law</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            No specific governing law or court jurisdiction is stated in these draft Terms. The operator should add its actual legal name, address, and jurisdiction after obtaining appropriate legal advice before commercial launch.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Changes to Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on this page with an updated revision date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Information</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            For questions about these Terms, contact <a href="mailto:contact.officialbrokr@gmail.com" className="text-primary-600 hover:underline">contact.officialbrokr@gmail.com</a>. The operator should still add its actual legal name, address, and jurisdiction after obtaining appropriate legal advice before treating these Terms as final.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
