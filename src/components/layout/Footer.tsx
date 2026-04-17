import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/30 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-text-primary"
            >
              Watch<span className="text-primary">You</span>
            </Link>
            <p className="mt-3 text-sm text-text-tertiary leading-relaxed">
              A premium streaming experience crafted with elegance.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-text-secondary mb-4">
              Browse
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Movies", href: "/browse?type=movie" },
                { label: "Series", href: "/browse?type=tv" },
                { label: "Trending", href: "/browse?sort=trending" },
                { label: "Top Rated", href: "/browse?sort=vote_average.desc" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-text-secondary mb-4">
              Account
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "My List", href: "/watchlist" },
                { label: "Profile", href: "/profile" },
                { label: "Sign In", href: "/login" },
                { label: "Sign Up", href: "/signup" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-tertiary hover:text-text-primary transition-colors duration-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-text-secondary mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-text-tertiary">{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} WatchYou. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs text-text-tertiary">
              Powered by{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors duration-500"
              >
                TMDB
              </a>
            </p>
            <span className="text-border">|</span>
            <a
              href="https://crafyne.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors duration-500"
            >
              Built by{" "}
              <span className="font-semibold text-text-secondary group-hover:text-primary transition-colors duration-500">
                Crafyne
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
