import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex-1 flex items-center justify-center min-h-[70vh] px-6">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">
            404
          </h1>
          <p className="text-xl text-text-secondary mb-2">Page Not Found</p>
          <p className="text-sm text-text-tertiary mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3.5 rounded-full bg-primary/90 hover:bg-primary text-white font-medium text-sm transition-all duration-500 hover:glow-violet hover:scale-105"
          >
            Back to Home
          </Link>
          <p className="mt-12 text-[11px] text-text-tertiary">
            Built by{" "}
            <a
              href="https://crafyne.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Crafyne
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
