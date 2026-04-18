"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isScrolled = scrollY > 50;
  const isHidden = scrollDirection === "down" && scrollY > 200;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all",
          "px-6 md:px-8 py-4 md:py-5",
          isScrolled ? "glass-strong" : "bg-transparent",
          isHidden ? "-translate-y-full" : "translate-y-0",
          isScrolled && "border-b border-border/50"
        )}
        style={{ transitionDuration: "500ms", transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight text-text-primary hover:text-primary transition-colors duration-500"
          >
            Watch<span className="text-primary">You</span>
          </Link>

          {/* Center Nav Links — Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-500 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <SearchBar isOpen={isSearchOpen} onToggle={() => setIsSearchOpen(!isSearchOpen)} />

            {/* Profile */}
            <Link
              href="/profile"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 transition-all duration-500 hover:glow-violet"
            >
              <User size={16} className="text-text-secondary" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 transition-all duration-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={18} className="text-text-primary" />
              ) : (
                <Menu size={18} className="text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
