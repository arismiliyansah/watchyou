import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
