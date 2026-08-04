import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Tool | Tradivex",
  description: "Preview a trading-tool submission for the Tradivex directory. No submission is saved until a backend is connected.",
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
