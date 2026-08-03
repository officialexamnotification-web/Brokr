"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Cancellation of the native share sheet is expected.
    }
  }

  return (
    <button type="button" onClick={handleShare} className="flex items-center gap-1 hover:text-primary-500 transition-colors" aria-label="Share this article">
      <Share2 className="w-3.5 h-3.5" /> {copied ? "Link copied" : "Share"}
    </button>
  );
}
