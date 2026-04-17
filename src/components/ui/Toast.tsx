"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  toast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const Icon = toast.type === "success" ? Check : toast.type === "error" ? AlertCircle : AlertCircle;
  const iconColor = toast.type === "success" ? "text-green-400" : toast.type === "error" ? "text-red-400" : "text-accent";

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl glass-strong border border-border/30 shadow-lg shadow-black/20 transition-all duration-300",
        isVisible && !isLeaving
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
    >
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0",
        toast.type === "success" ? "bg-green-400/15" : toast.type === "error" ? "bg-red-400/15" : "bg-accent/15"
      )}>
        <Icon size={13} className={iconColor} />
      </div>
      <p className="text-sm text-text-primary">{toast.message}</p>
      <button
        onClick={() => {
          setIsLeaving(true);
          setTimeout(() => onDismiss(toast.id), 300);
        }}
        className="ml-2 text-text-tertiary hover:text-text-primary transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
