import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-white blur-3xl" />
        </div>
        <Link to="/" className="flex items-center gap-2 font-bold relative">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
            <Activity className="h-5 w-5" />
          </div>
          MediScan AI
        </Link>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold">Your prescription, decoded.</h2>
          <p className="mt-3 opacity-90">
            Join 25,000+ patients using AI to understand their medicines and save on every refill.
          </p>
          <div className="mt-8 space-y-3">
            {["Instant AI analysis", "6 pharmacies compared", "Private & secure"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-white" /> {s}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs opacity-70 relative">© 2026 MediScan AI</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 font-bold mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            MediScan AI
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-center text-muted-foreground">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}