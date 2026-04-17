"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-500",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 glass-strong"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center h-full gap-8 transition-all duration-500",
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 opacity-0"
        )}
      >
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-2xl font-semibold text-text-primary hover:text-primary transition-colors duration-500"
            style={{
              transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
            }}
          >
            {link.label}
          </Link>
        ))}

        <div className="mt-4 flex gap-4">
          <Link
            href="/login"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-white/20 text-sm font-medium text-text-primary hover:border-primary/50 transition-all duration-500"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-primary/90 hover:bg-primary text-sm font-medium text-white transition-all duration-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
