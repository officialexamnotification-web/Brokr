import type { Tool } from "@/lib/data";

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function canonicalCountry(value: string) {
  const country = normalise(value);
  const aliases: Record<string, string> = {
    uk: "united kingdom",
    us: "united states",
    usa: "united states",
    eu: "european union",
  };
  return aliases[country] ?? country;
}

function hasCountryOverlap(current: Tool, candidate: Tool) {
  const currentCountries = current.supportedCountries.map(canonicalCountry);
  const candidateCountries = candidate.supportedCountries.map(canonicalCountry);
  const broadCoverage = (country: string) => /global|worldwide|most countries|all countries/.test(country);

  if (currentCountries.some(broadCoverage) || candidateCountries.some(broadCoverage)) return true;
  return currentCountries.some((country) => candidateCountries.includes(country));
}

function sharedValues(current: string[], candidate: string[]) {
  const candidateValues = new Set(candidate.map(normalise));
  return current.filter((value) => candidateValues.has(normalise(value))).length;
}

function pricingModel(tool: Tool) {
  const text = normalise(`${tool.pricing} ${tool.pricingDetail}`);
  if (text.includes("subscription") || text.includes("monthly") || text.includes("annual")) return "subscription";
  if (text.includes("commission")) return "commission";
  if (text.includes("spread")) return "spread";
  if (text.includes("free")) return "free";
  if (text.includes("fee")) return "fees";
  return "other";
}

function relevanceScore(current: Tool, candidate: Tool) {
  const countryScore = hasCountryOverlap(current, candidate) ? 20 : 0;
  const platformScore = Math.min(sharedValues(current.platforms, candidate.platforms) * 6, 18);
  const featureScore = Math.min(sharedValues(current.features, candidate.features) * 2, 14);
  const pricingScore = pricingModel(current) === pricingModel(candidate) ? 8 : 0;
  return 100 + countryScore + platformScore + featureScore + pricingScore;
}

/** Returns neutral, same-category listings ordered by comparable attributes. */
export function getRelevantTools(currentTool: Tool, candidates: Tool[], limit: number) {
  return candidates
    .filter((tool) => tool.categoryId === currentTool.categoryId && tool.slug !== currentTool.slug)
    .sort((a, b) => relevanceScore(currentTool, b) - relevanceScore(currentTool, a) || a.name.localeCompare(b.name))
    .slice(0, limit);
}
