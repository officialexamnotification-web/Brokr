import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Tradivex | Directory Feedback",
  description: "Contact Tradivex at contact@tradivex.com or send directory feedback for review.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
