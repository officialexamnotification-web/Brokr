"use client";

import { Mail, MessageSquare, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { isFirebaseReady, saveContactMessage } from "@/lib/firebase";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "preview" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;

    if (!isFirebaseReady) {
      setStatus("preview");
      return;
    }

    const values = new FormData(form);
    if (String(values.get("company") || "").trim()) return;
    const name = String(values.get("name") || "").trim();
    const email = String(values.get("email") || "").trim();
    const subject = String(values.get("subject") || "").trim();
    const message = String(values.get("message") || "").trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !subject || !message) {
      setStatus("error");
      setError("Please complete all required fields with a valid email address.");
      return;
    }
    setStatus("saving");
    try {
      await saveContactMessage({
        name,
        email,
        subject,
        message,
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("CONTACT FORM ERROR:", err);
      setStatus("error");
      setError("We could not save your message. Please try again later.");
    }
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      <div className="absolute inset-0 grid-pattern noise-bg pointer-events-none" />
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      <div className="orb orb-1 top-[-10%] left-[-5%]" />
      <div className="orb orb-2 bottom-[-10%] right-[-5%]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Contact <span className="text-primary-600">Us</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isFirebaseReady
            ? "Messages are securely stored for review. No automatic email reply is sent."
            : "This form is available in preview mode. Messages are not sent or stored until the backend is connected."}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="data">Data Correction</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm"
              >
                <Send className="w-4 h-4" />
                {status === "saving" ? "Saving..." : isFirebaseReady ? "Send Message" : "Preview Message"}
              </button>
              {(status === "preview" || status === "success" || status === "error") && (
                <p className="text-sm text-amber-700 dark:text-amber-400" role="status">
                  {status === "preview" && "This form is currently a preview. No message was sent or saved because Firebase is not configured yet."}
                  {status === "success" && "Your message was saved for review. No automatic email reply was sent."}
                  {status === "error" && error}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Contact status</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Email: <a href="mailto:contact@tradivex.com" className="text-primary-600 hover:underline break-all">contact@tradivex.com</a></p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{isFirebaseReady ? "Form storage and anti-spam protection are connected for review." : "The form backend and anti-spam protection are not fully configured yet."}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Do not enter passwords, payment details, or other sensitive information.</p>
              </div>
            </div>
          </div>


          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Before Contacting Us</h3>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-2 marker:text-primary-600">
              <li>Review the tool page and its source links for provider-specific questions</li>
              <li>Review our Methodology page for comparison details</li>
              <li>Read our Affiliate Disclosure for transparency info</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Important Note</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              We cannot provide financial advice or investment recommendations. For investment guidance, please consult with qualified financial advisors.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
