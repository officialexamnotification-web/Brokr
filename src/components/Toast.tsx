import React from 'react';
import { CheckCircle, Copy } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-amber-500/80 shadow-xl shadow-black/80 text-white backdrop-blur-md">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
          <CheckCircle className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Copied to Clipboard</p>
          <p className="text-sm font-subgaming font-bold text-amber-300 truncate max-w-xs">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
