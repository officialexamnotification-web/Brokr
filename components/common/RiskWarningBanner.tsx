import React from "react";
import { AlertTriangle } from "lucide-react";

export default function RiskWarningBanner() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
            Risk Warning
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            Trading financial instruments involves significant risk and can result in the loss of your invested capital. 
            You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved. 
            Leverage trading can amplify both profits and losses. Past performance is not indicative of future results. 
            Before trading, please consider your level of experience, investment objectives, and seek independent financial advice if necessary.
          </p>
        </div>
      </div>
    </div>
  );
}
