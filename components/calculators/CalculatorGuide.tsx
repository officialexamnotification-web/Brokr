import Link from "next/link";
import type { CalculatorFaq } from "@/lib/calculator-seo";

type Props = {
  intro: string;
  howItWorks: string;
  bullets: string[];
  faqs: CalculatorFaq[];
  related: string[];
  relatedTitles: Record<string, string>;
};

export default function CalculatorGuide({ intro, howItWorks, bullets, faqs, related, relatedTitles }: Props) {
  return (
    <section className="mt-12 max-w-4xl" aria-labelledby="calculator-guide-heading">
      <div className="border-t border-slate-200 pt-10 dark:border-slate-800">
        <p className="text-sm font-bold uppercase tracking-widest text-primary-600">How this calculator works</p>
        <h2 id="calculator-guide-heading" className="mt-2 text-2xl font-black text-slate-900 dark:text-white">Practical guide and assumptions</h2>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</p>

        <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Formula and method</h3>
        <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">{howItWorks}</p>

        <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">Before using the result</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-slate-600 dark:text-slate-300">
          {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>

        {faqs.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frequently asked questions</h3>
            <div className="mt-4 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">{faq.question}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Related calculators</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {related.map((slug) => (
                <Link key={slug} href={`/calculators/${slug}`} className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:border-primary-400 dark:border-primary-900/60 dark:bg-primary-950/30 dark:text-primary-300">
                  {relatedTitles[slug] ?? slug}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
