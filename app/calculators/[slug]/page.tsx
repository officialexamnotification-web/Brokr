import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";
import { calculatorDefinitions, getCalculatorDefinition, type CalculatorSlug } from "@/lib/calculators";
import { getCalculatorSeoContent } from "@/lib/calculator-seo";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tradivex.com").replace(/\/$/, "");

export function generateStaticParams() {
  return calculatorDefinitions.map((calculator) => ({ slug: calculator.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) return { title: "Calculator not found | Tradivex" };
  const seo = getCalculatorSeoContent(calculator.slug, calculator.description);
  return {
    title: `${calculator.title} | Tradivex`,
    description: `${seo.intro} Educational estimate only; verify provider rules and costs.`,
    alternates: { canonical: `/calculators/${calculator.slug}` },
    openGraph: {
      title: `${calculator.title} | Tradivex`,
      description: seo.intro,
      type: "website",
      url: `/calculators/${calculator.slug}`,
    },
  };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) notFound();
  const seo = getCalculatorSeoContent(calculator.slug, calculator.description);
  const relatedTitles = Object.fromEntries(calculatorDefinitions.map((item) => [item.slug, item.shortTitle]));
  const calculatorJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: calculator.title,
        description: seo.intro,
        url: `${siteUrl}/calculators/${calculator.slug}`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        isPartOf: { "@type": "WebSite", name: "Tradivex", url: siteUrl },
      },
      {
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }} />
      <CalculatorSuite slug={calculator.slug as CalculatorSlug} />
      <div className="bg-white px-4 pb-16 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CalculatorGuide {...seo} relatedTitles={relatedTitles} />
        </div>
      </div>
    </>
  );
}
