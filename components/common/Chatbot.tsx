"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function Chatbot() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Tawk API
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      window.Tawk_API.customPosition = true;
      window.Tawk_API.widgetPosition = 'bottom-left';
      
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/6a6bda9931d0d81d4b5d479a/1juqkrqhj";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);

      return () => {
        // Don't remove script - Tawk.to persists
      };
    }
  }, []);

  return null;
}
