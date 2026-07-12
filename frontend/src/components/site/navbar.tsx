import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/site/theme-toggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant">
            <Activity className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MediScan AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/register" className="hidden sm:inline-flex">
            <Button size="sm" className="gradient-primary text-primary-foreground shadow-elegant">
              Get Started
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 px-4 py-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-sm font-medium py-2" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link to="/register" onClick={() => setOpen(false)}>
            <Button className="w-full gradient-primary text-primary-foreground">Get Started</Button>
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}