import { Metadata } from "next";
import { Shield, Eye, Lock, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Brokr",
  description: "Brokr's Privacy Policy - Learn how we collect, use, and protect your personal information. Your privacy is important to us.",
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
          Last updated: August 2026
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary-600" />
            Introduction
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Brokr ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit this website and use its services. Please read this policy carefully to understand our practices regarding your personal information.
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
                <li>Contact information (name, email address) when you submit forms</li>
                <li>Feedback and communications you send to us</li>
                <li>Account information if you create an account</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Automatically Collected Information</h3>
              <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Referring website and pages visited</li>
                <li>Time and date of visit</li>
                <li>Cookies and similar tracking technologies</li>
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
            Brokr currently uses local browser storage for the cookie-preference banner and theme preference. Optional analytics and advertising should only be enabled after the relevant consent is recorded. If Google AdSense or other advertising partners are enabled, their cookies, processing, and regional consent requirements will be described here and configured before ads are served.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary-600" />
            How We Use Your Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>To provide, maintain, and improve our services</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To send you technical notices and updates</li>
            <li>To analyze usage patterns and improve our website</li>
            <li>To detect and prevent fraud, abuse, and security issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Cookie className="w-6 h-6 text-primary-600" />
            Cookies and Tracking
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to collect and track information about your activities on our website:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Information Sharing</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul className="text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
            <li>With service providers who perform services on our behalf</li>
            <li>With affiliate partners when you click on affiliate links (as disclosed)</li>
            <li>To comply with legal requirements or court orders</li>
            <li>To protect our rights, property, or safety</li>
            <li>In connection with a business transfer or merger</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Security</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
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
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
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
            If you have questions about this Privacy Policy or our data practices, please contact us at privacy@brokr.com.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
