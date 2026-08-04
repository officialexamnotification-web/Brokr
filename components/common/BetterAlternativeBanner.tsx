import { Tool } from "@/lib/data";

/**
 * Kept as a compatibility component for existing imports. Tradivex no longer
 * labels one financial product as a "better" alternative without verified,
 * user-specific criteria.
 */
export default function BetterAlternativeBanner(_props: { currentTool: Tool }) {
  return null;
}
