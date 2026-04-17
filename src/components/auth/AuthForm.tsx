"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Registration failed");
        }
      }

      // Sign in with credentials
      const { signIn } = await import("next-auth/react");
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl border border-border/30 p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <Link
          href="/"
          className="inline-block text-2xl font-bold tracking-tight text-text-primary mb-2"
        >
          Watch<span className="text-primary">You</span>
        </Link>
        <h1 className="text-lg font-semibold text-text-primary">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-text-tertiary mt-1">
          {mode === "login"
            ? "Sign in to continue watching"
            : "Start your streaming journey"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {mode === "signup" && (
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-text-secondary mb-2 tracking-wide uppercase"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border/30 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary/50 focus:glow-violet outline-none transition-all duration-500"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-text-secondary mb-2 tracking-wide uppercase"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-surface border border-border/30 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary/50 focus:glow-violet outline-none transition-all duration-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs font-medium text-text-secondary mb-2 tracking-wide uppercase"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border/30 text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary/50 focus:glow-violet outline-none transition-all duration-500 pr-11"
              placeholder="Min 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-500",
            "bg-primary/90 hover:bg-primary text-white",
            "hover:glow-violet-strong hover:scale-[1.02]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          )}
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin mx-auto" />
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Toggle */}
      <p className="text-center text-sm text-text-tertiary mt-6">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary-hover transition-colors duration-300"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-hover transition-colors duration-300"
            >
              Sign In
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
