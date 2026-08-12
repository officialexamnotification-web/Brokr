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
  
  // Enhanced metadata for pip-value calculator specifically
  const isPipCalculator = calculator.slug === "pip-value";
  const isForexPnlCalculator = calculator.slug === "forex-pnl";
  const enhancedTitle = isPipCalculator 
    ? "Pip Calculator | Calculate Forex Pip Value Instantly"
    : isForexPnlCalculator
    ? "Forex Profit Calculator | Calculate Forex P&L Instantly"
    : `${calculator.title} | Tradivex`;
  const enhancedDescription = isPipCalculator
    ? "Calculate forex pip values instantly with live exchange rates. Free pip calculator for all major, minor, and exotic currency pairs including JPY pairs. Accurate risk management for standard, mini, and micro lots."
    : isForexPnlCalculator
    ? "Calculate forex profit and loss instantly with live exchange rates. Free forex P&L calculator for all major, minor, and exotic currency pairs. Accurate risk management for standard, mini, and micro lots."
    : `${seo.intro} Educational estimate only; verify provider rules and costs.`;
  const enhancedKeywords = isPipCalculator
    ? "pip calculator, free pip calculator, forex pip value, currency pip calculation, JPY pip calculator, lot size calculator, forex risk management, position size calculator, standard lot mini lot micro lot, forex trading tools"
    : isForexPnlCalculator
    ? "forex profit calculator, forex loss calculator, profit loss calculator, forex pnl calculator, currency profit calculation, JPY profit calculator, lot size calculator, forex risk management, position size calculator, standard lot mini lot micro lot, forex trading tools"
    : undefined;
  
  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: enhancedKeywords,
    alternates: { canonical: `${siteUrl}/calculators/${calculator.slug}` },
    openGraph: {
      title: enhancedTitle,
      description: enhancedDescription,
      type: "website",
      url: `${siteUrl}/calculators/${calculator.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: enhancedTitle,
      description: enhancedDescription,
    },
  };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) notFound();
  const seo = getCalculatorSeoContent(calculator.slug, calculator.description);
  const relatedTitles = Object.fromEntries(calculatorDefinitions.map((item) => [item.slug, item.shortTitle]));
  const graph: any[] = [
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
  ];
  
  // Add enhanced schema for pip-value calculator
  if (calculator.slug === "pip-value") {
    graph[0] = {
      ...graph[0],
      featureList: [
        "Live forex exchange rates",
        "Support for 100+ currency pairs",
        "JPY pair special handling",
        "Standard/Mini/Micro lot calculations",
        "Automatic currency conversion",
        "Real-time pip value updates"
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock"
      }
    };
    
    graph.push({
      "@type": "HowTo",
      name: "How to Calculate Forex Pip Value",
      step: [
        {
          "@type": "HowToStep",
          text: "Select your currency pair from the dropdown menu (supports major, minor, and exotic pairs)"
        },
        {
          "@type": "HowToStep", 
          text: "Choose your account currency for accurate pip value conversion"
        },
        {
          "@type": "HowToStep",
          text: "Enter your position size in lots (standard, mini, or micro lots)"
        },
        {
          "@type": "HowToStep",
          text: "Enable auto-fetch for live exchange rates or enter manual conversion rate"
        },
        {
          "@type": "HowToStep",
          text: "View instant pip value calculations with detailed formula breakdown"
        }
      ]
    });
  }
  
  const calculatorJsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }} />
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <CalculatorSuite slug={calculator.slug as CalculatorSlug} />
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CalculatorGuide {...seo} relatedTitles={relatedTitles} />
          </div>
        </div>
      </div>
    </>
  );
}
