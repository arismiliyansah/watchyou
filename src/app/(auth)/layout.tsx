export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#a78bfa_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
