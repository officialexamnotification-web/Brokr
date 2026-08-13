import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import CalculatorGuide from "@/components/calculators/CalculatorGuide";
import { calculatorDefinitions, getCalculatorDefinition, type CalculatorSlug } from "@/lib/calculators";
import { getCalculatorSeoContent } from "@/lib/calculator-seo";

const siteUrl = "https://www.tradivex.com";

export function generateStaticParams() {
  return calculatorDefinitions.map((calculator) => ({ slug: calculator.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) return { title: "Calculator not found | Tradivex" };
  const seo = getCalculatorSeoContent(calculator.slug, calculator.description);
  
  // Enhanced metadata for specific calculators
  const isPipCalculator = calculator.slug === "pip-value";
  const isForexPnlCalculator = calculator.slug === "forex-pnl";
  const isPositionSizeCalculator = calculator.slug === "position-size";
  const isForexMarginCalculator = calculator.slug === "forex-margin";
  const isOptionsPayoffCalculator = calculator.slug === "options-payoff";
  const isPivotPointsCalculator = calculator.slug === "pivot-points";
  const enhancedTitle = isPipCalculator
    ? "Pip Calculator | Calculate Forex Pip Value Instantly"
    : isForexPnlCalculator
    ? "Forex Profit Calculator | Calculate Forex P&L Instantly"
    : isPositionSizeCalculator
    ? "Position Size Calculator | Calculate Forex Lot Size Instantly"
    : isForexMarginCalculator
    ? "Forex Margin Calculator | Calculate Required Margin Instantly"
    : isOptionsPayoffCalculator
    ? "Options Payoff Calculator | Multi-Leg Strategies & Vol Surface"
    : isPivotPointsCalculator
    ? "Pivot Point Calculator | Classic, Woodie's, Camarilla, DeMark's, Fibonacci"
    : `${calculator.title} | Tradivex`;
  const enhancedDescription = isPipCalculator
    ? "Calculate forex pip values instantly with live exchange rates. Free pip calculator for all major, minor, and exotic currency pairs including JPY pairs. Accurate risk management for standard, mini, and micro lots."
    : isForexPnlCalculator
    ? "Calculate forex profit and loss instantly with live exchange rates. Free forex P&L calculator for all major, minor, and exotic currency pairs. Accurate risk management for standard, mini, and micro lots."
    : isPositionSizeCalculator
    ? "Calculate forex position size instantly with live exchange rates. Free position size calculator for all major, minor, and exotic currency pairs including JPY pairs. Accurate risk management for standard, mini, and micro lots with automatic pip value calculation."
    : isForexMarginCalculator
    ? "Calculate forex margin requirements instantly with live exchange rates. Free margin calculator for all major, minor, and exotic currency pairs. Accurate leverage planning for standard, mini, and micro lots with automatic currency conversion."
    : isOptionsPayoffCalculator
    ? "Professional options calculator with BSM/Binomial models, complete & advanced Greeks, IV solver, multi-leg strategy builder (spreads, straddles, iron condors), volatility surface visualization, and interactive payoff diagrams."
    : isPivotPointsCalculator
    ? "Professional pivot point calculator with Classic, Woodie's, Camarilla, DeMark's, and Fibonacci methods. Live market data for 40+ US stocks, daily/weekly/monthly timeframes, CSV/PDF export, chart visualization, proximity alerts, and 22 global timezones covering USA, Canada, UK, Europe, Asia, Australia, New Zealand, Brazil, South Africa. Free technical analysis tool for accurate support and resistance levels."
    : `${seo.intro} Educational estimate only; verify provider rules and costs.`;
  const enhancedKeywords = isPipCalculator
    ? "pip calculator, free pip calculator, forex pip value, currency pip calculation, JPY pip calculator, lot size calculator, forex risk management, position size calculator, standard lot mini lot micro lot, forex trading tools"
    : isForexPnlCalculator
    ? "forex profit calculator, forex loss calculator, profit loss calculator, forex pnl calculator, currency profit calculation, JPY profit calculator, lot size calculator, forex risk management, position size calculator, standard lot mini lot micro lot, forex trading tools"
    : isPositionSizeCalculator
    ? "position size calculator, free position size calculator, forex lot size, currency position calculation, JPY position calculator, lot size calculator, forex risk management, pip value calculator, standard lot mini lot micro lot, forex trading tools, risk percentage calculator"
    : isForexMarginCalculator
    ? "forex margin calculator, free margin calculator, forex leverage calculation, currency margin requirement, JPY margin calculator, lot size margin calculator, forex risk management, leverage calculator, standard lot mini lot micro lot, forex trading tools, margin requirement calculator"
    : isOptionsPayoffCalculator
    ? "options payoff calculator, Black-Scholes calculator, binomial model calculator, American options calculator, European options calculator, option Greeks calculator, implied volatility calculator, delta gamma theta vega rho, advanced Greeks vanna charm vomma zomma, probability of profit, payoff diagram, multi-leg strategies, option spreads, iron condor, straddle strangle, volatility surface, option pricing model, call put calculator, time value intrinsic value, options risk management, professional options tools, enterprise options calculator"
    : isPivotPointsCalculator
    ? "pivot point calculator, free pivot point calculator, support resistance calculator, technical analysis tool, classic pivot points, woodie pivot points, camarilla pivot points, demark pivot points, fibonacci pivot points, daily pivot points, weekly pivot points, monthly pivot points, stock pivot calculator, trading levels calculator, s1 s2 s3 r1 r2 r3, pivot point formula, forex pivot points, stock market support resistance, day trading calculator, swing trading calculator, position trading calculator, intraday trading tool, market analysis calculator, price level calculator, trading calculator, technical analysis calculator"
    : undefined;
  
  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: enhancedKeywords,
    robots: { index: true, follow: true },
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
  
  // Add enhanced schema for position-size calculator
  if (calculator.slug === "position-size") {
    graph[0] = {
      ...graph[0],
      featureList: [
        "Live forex exchange rates",
        "Support for 50+ currency pairs",
        "JPY pair auto-detection",
        "Automatic pip value calculation",
        "Multi-currency account support",
        "Cross-currency conversion",
        "Standard/Mini/Micro lot calculations",
        "Risk-based position sizing",
        "Real-time calculations with caching"
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
      name: "How to Calculate Forex Position Size",
      step: [
        {
          "@type": "HowToStep",
          text: "Enter your account balance in your preferred currency"
        },
        {
          "@type": "HowToStep",
          text: "Set your risk percentage (1-2% recommended for most traders)"
        },
        {
          "@type": "HowToStep",
          text: "Enter your stop loss distance in pips based on your trading strategy"
        },
        {
          "@type": "HowToStep",
          text: "Select your currency pair from 50+ available pairs"
        },
        {
          "@type": "HowToStep",
          text: "Choose your account currency for accurate cross-currency conversion"
        },
        {
          "@type": "HowToStep",
          text: "Enable auto-fetch for live pip values or enter manual pip value"
        },
        {
          "@type": "HowToStep",
          text: "View optimal position size in lots with detailed formula breakdown"
        }
      ]
    });
  }
  
  // Add enhanced schema for forex-margin calculator
  if (calculator.slug === "forex-margin") {
    graph[0] = {
      ...graph[0],
      featureList: [
        "Live forex exchange rates",
        "Support for 50+ currency pairs",
        "18 leverage options (1:5 to 1:1000)",
        "Multi-currency account support",
        "Automatic currency conversion",
        "Standard/Mini/Micro lot calculations",
        "Real-time margin requirements",
        "10-minute caching system",
        "Detailed formula breakdown"
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
      name: "How to Calculate Forex Margin Requirements",
      step: [
        {
          "@type": "HowToStep",
          text: "Select your currency pair from 50+ available pairs"
        },
        {
          "@type": "HowToStep",
          text: "Choose your account currency for accurate base-to-account conversion"
        },
        {
          "@type": "HowToStep",
          text: "Enter your position size in lots (1 lot = 100,000 units)"
        },
        {
          "@type": "HowToStep",
          text: "Select leverage ratio from 18 options (1:5 to 1:1000)"
        },
        {
          "@type": "HowToStep",
          text: "Enter the current entry price for the currency pair"
        },
        {
          "@type": "HowToStep",
          text: "Enable auto-fetch for live conversion rates or enter manual rate"
        },
        {
          "@type": "HowToStep",
          text: "View required margin and notional value with detailed formula breakdown"
        }
      ]
    });
  }
  
  // Add enhanced schema for options-payoff calculator
  if (calculator.slug === "options-payoff") {
    graph[0] = {
      ...graph[0],
      featureList: [
        "Black-Scholes-Merton model for European options",
        "Binomial model for American options with early exercise",
        "Complete Greeks suite (Delta, Gamma, Theta, Vega, Rho)",
        "Advanced Greeks (Vanna, Charm, Vomma, Zomma)",
        "Implied volatility solver (Newton-Raphson)",
        "Probability of profit calculation",
        "Multi-leg strategy builder with 9 pre-built templates",
        "Strategy templates: Long Call, Long Put, Bull Spread, Bear Spread, Straddle, Strangle, Iron Condor, Covered Call, Protective Put",
        "Interactive payoff diagram visualization",
        "Volatility surface visualization with skew and term structure",
        "Time value vs intrinsic value breakdown",
        "Call and put option support",
        "Long and short position support",
        "European and American option styles",
        "Strategy P&L aggregation with max profit/loss analysis",
        "Enterprise-grade accuracy"
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
      name: "How to Use the Enterprise Options Calculator",
      step: [
        {
          "@type": "HowToStep",
          text: "Choose between single option analysis or multi-leg strategy builder mode"
        },
        {
          "@type": "HowToStep",
          text: "For single options: select type (call/put), position (long/short), and style (European/American)"
        },
        {
          "@type": "HowToStep",
          text: "For strategies: load a pre-built template (Bull Spread, Iron Condor, Straddle, etc.) or build custom legs"
        },
        {
          "@type": "HowToStep",
          text: "Enter underlying price, time to expiry, volatility, and risk-free rate"
        },
        {
          "@type": "HowToStep",
          text: "View fair value, complete Greeks, advanced Greeks, and probability of profit"
        },
        {
          "@type": "HowToStep",
          text: "Analyze interactive payoff diagrams for single options and multi-leg strategies"
        },
        {
          "@type": "HowToStep",
          text: "Review volatility surface to understand skew and term structure"
        },
        {
          "@type": "HowToStep",
          text: "Optionally solve for implied volatility from market premium"
        }
      ]
    });
  }

  // Add enhanced schema for pivot-points calculator
  if (calculator.slug === "pivot-points") {
    graph[0] = {
      ...graph[0],
      featureList: [
        "Five calculation methods: Classic, Woodie's, Camarilla, DeMark's, Fibonacci",
        "Live market data integration for 40+ US stocks",
        "Multiple timeframes: Daily, Weekly, Monthly",
        "Customizable decimal precision (2-5 decimals)",
        "CSV and PDF export functionality",
        "Interactive chart visualization with Recharts",
        "Proximity alerts system for level notification",
        "Mid-level calculations (R1.5, S1.5, etc.)",
        "Historical data tracking with localStorage",
        "Risk management integration",
        "22 global timezone options covering USA, Canada, UK, Europe, Asia, Australia, New Zealand, Brazil, South Africa",
        "Color-coded zones for visual identification",
        "Quick preset selection",
        "Distance from current price calculation",
        "5-minute caching system for fast performance"
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
      name: "How to Calculate Pivot Points",
      step: [
        {
          "@type": "HowToStep",
          text: "Enter the high, low, and close prices from your trading period, or load live data from 40+ US stocks"
        },
        {
          "@type": "HowToStep",
          text: "Select your preferred calculation method (Classic, Woodie's, Camarilla, DeMark's, or Fibonacci)"
        },
        {
          "@type": "HowToStep",
          text: "Choose the timeframe (Daily, Weekly, or Monthly) based on your trading style"
        },
        {
          "@type": "HowToStep",
          text: "Set decimal precision (2-5 decimals) for accurate price level display"
        },
        {
          "@type": "HowToStep",
          text: "Select your timezone to view relevant market session hours"
        },
        {
          "@type": "HowToStep",
          text: "Enable proximity alerts to notify when price approaches key levels"
        },
        {
          "@type": "HowToStep",
          text: "View calculated pivot points (R1-R3, S1-S3) with mid-levels and chart visualization"
        },
        {
          "@type": "HowToStep",
          text: "Export results via CSV or PDF for record-keeping and analysis"
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
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CalculatorSuite slug={calculator.slug as CalculatorSlug} />
          </div>
        </div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <CalculatorGuide {...seo} relatedTitles={relatedTitles} />
          </div>
        </div>
      </div>
    </>
  );
}
