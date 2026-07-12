import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/auth-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password · MediScan AI" }] }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email — we'll send you a reset link."
      footer={<Link to="/login" className="text-primary font-semibold">Back to login</Link>}
    >
      {sent ? (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-sm">If that email exists, a reset link is on the way.</p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Reset link sent");
            setSent(true);
          }}
        >
          <div className="space-y-2"><Label>Email</Label><Input type="email" required /></div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-elegant">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}