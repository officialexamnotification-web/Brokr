import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Brokr | Directory Feedback",
  description: "Send feedback about Brokr listings or report missing information. This preview form is not connected to a mailbox yet.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
