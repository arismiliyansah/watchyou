"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { User, Bookmark, Clock, LogOut, Film } from "lucide-react";
import Link from "next/link";

interface UserProfile {
  name: string | null;
  email: string;
  image: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState({ watchlist: 0, history: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const [sessionRes, watchlistRes, historyRes] = await Promise.all([
          fetch("/api/auth/session"),
          fetch("/api/watchlist"),
          fetch("/api/history"),
        ]);

        if (sessionRes.ok) {
          const session = await sessionRes.json();
          if (session?.user) {
            setUser(session.user);
          }
        }

        if (watchlistRes.ok) {
          const watchlist = await watchlistRes.json();
          setStats((prev) => ({ ...prev, watchlist: watchlist.length }));
        }

        if (historyRes.ok) {
          const history = await historyRes.json();
          setStats((prev) => ({ ...prev, history: history.length }));
        }
      } catch {
        // Not logged in
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    await signOut({ callbackUrl: "/" });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-28 pb-16">
          <div className="max-w-2xl mx-auto px-6 md:px-8">
            <div className="animate-pulse space-y-6">
              <div className="w-24 h-24 rounded-full bg-surface mx-auto" />
              <div className="w-48 h-6 bg-surface rounded-xl mx-auto" />
              <div className="w-32 h-4 bg-surface rounded-xl mx-auto" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-28 pb-16">
          <div className="max-w-md mx-auto px-6 md:px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-surface border border-border/30 flex items-center justify-center mx-auto mb-6">
              <User size={32} className="text-text-tertiary" />
            </div>
            <h1 className="text-xl font-semibold text-text-primary mb-2">
              Sign in to view your profile
            </h1>
            <p className="text-sm text-text-tertiary mb-6">
              Access your watchlist, viewing history, and preferences.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 rounded-full bg-primary/90 hover:bg-primary text-white text-sm font-medium transition-all duration-500 hover:glow-violet"
            >
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          {/* Profile Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border border-border/30 flex items-center justify-center mx-auto mb-5">
              <User size={36} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              {user.name || "User"}
            </h1>
            <p className="text-sm text-text-tertiary">{user.email}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <Link
              href="/watchlist"
              className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border/30 hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                <Bookmark size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {stats.watchlist}
                </p>
                <p className="text-xs text-text-tertiary">In Watchlist</p>
              </div>
            </Link>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-border/30">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {stats.history}
                </p>
                <p className="text-xs text-text-tertiary">Watched</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 mb-10">
            <Link
              href="/browse"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-all duration-500 group"
            >
              <Film size={18} className="text-text-tertiary group-hover:text-primary transition-colors duration-500" />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-500">
                Browse Content
              </span>
            </Link>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-5 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-500 w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}
