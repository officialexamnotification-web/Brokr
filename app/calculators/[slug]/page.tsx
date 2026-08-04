import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalculatorSuite from "@/components/calculators/CalculatorSuite";
import { calculatorDefinitions, getCalculatorDefinition, type CalculatorSlug } from "@/lib/calculators";

export function generateStaticParams() {
  return calculatorDefinitions.map((calculator) => ({ slug: calculator.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) return { title: "Calculator not found | Tradivex" };
  return { title: `${calculator.title} | Tradivex`, description: calculator.description };
}

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  const calculator = getCalculatorDefinition(params.slug);
  if (!calculator) notFound();
  return <CalculatorSuite slug={calculator.slug as CalculatorSlug} />;
}
