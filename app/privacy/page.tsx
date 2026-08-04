import { Metadata } from "next";
import { Shield, Eye, Lock, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Tradivex",
  description: "Tradivex's Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is important to us.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Privacy <span className="text-primary-600">Policy</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Last updated: August 3, 2026
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-600" />
            Introduction
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Tradivex ("we," "our," or "us") is an informational directory. This policy describes the website's current data practices. Contact, tool-submission, and newsletter storage is enabled only when the deployment's Firebase configuration and security rules are active; otherwise those forms remain previews and do not send or store entries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-primary-600" />
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Information You Provide</h3>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                <li>When Firebase is configured, contact messages and tool submissions are stored for review. When it is not configured, entered values remain in the browser only while the page is open and are not sent or stored.</li>
                <li>Newsletter emails are stored only when a user submits the subscription form after Firebase has been enabled. Newsletter delivery is not connected automatically.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Automatically Collected Information</h3>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                <li>Hosting, CDN, or security providers may process request metadata such as IP address, browser type, device information, referring page, and request time.</li>
                <li>Tradivex currently uses local browser storage for theme and cookie-preference settings.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Cookie className="w-6 h-6 text-primary-600" />
            Cookies and advertising
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Tradivex currently uses local browser storage for the cookie-preference banner and theme preference. No optional analytics or advertising scripts are currently enabled by this project. If Google AdSense or another advertising partner is added, this policy and the consent flow must be updated before those services are activated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary-600" />
            How We Use Your Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Based on the current implementation, information may be used for the following limited purposes:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>To provide the directory and remember local preferences</li>
            <li>To maintain website availability and security through hosting or infrastructure providers</li>
            <li>To review contact messages, tool submissions, and newsletter subscriptions when those Firebase-backed forms are enabled</li>
            <li>To comply with applicable legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Cookie className="w-6 h-6 text-primary-600" />
            Cookies and Tracking
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            The current project uses the following storage:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li><strong>Essential local storage:</strong> Stores site-preference and theme settings.</li>
            <li><strong>Optional analytics or advertising:</strong> Not currently enabled by this project.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            You can clear local storage and control cookies through your browser settings. If optional services are added later, their consent controls and provider disclosures must be added here before activation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Information Sharing</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Tradivex does not sell personal information. When Firebase-backed forms are enabled, the submitted fields are processed by Firebase/Google Cloud as the storage provider and by Tradivex for review. Information may be processed or disclosed only as necessary for:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Third-party hosting, CDN, security, or other infrastructure providers that support the website</li>
            <li>Commercial or affiliate partners only if such links are introduced later and clearly disclosed</li>
            <li>To comply with legal requirements or court orders</li>
            <li>To protect our rights, property, or safety</li>
            <li>In connection with a business transfer or merger</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Security</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use reasonable technical measures for this project, but no method of transmission or storage over the internet is completely secure. We cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
            <li>Object to processing of your information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Third-Party Links</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our website contains links to third-party websites, including broker and exchange platforms. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Children's Privacy</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">International Data Transfers</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Hosting, CDN, security, or other infrastructure providers may process request data in countries other than your country of residence. The applicable provider terms and safeguards should be reviewed when those services are selected or changed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Changes to This Policy</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated revision date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Privacy questions and deletion requests can be sent to <a href="mailto:contact@tradivex.com" className="text-primary-600 hover:underline">contact@tradivex.com</a>. Publish a clear retention period and deletion process before collecting personal information at production scale. Users should not submit passwords, payment details, or other sensitive information through these forms.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
