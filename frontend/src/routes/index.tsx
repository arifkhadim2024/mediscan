import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ScanLine, Shield, Sparkles, TrendingDown, MessageSquare, FileText,
  ArrowRight, Check, Stethoscope, Pill, Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { icon: ScanLine, title: "AI Prescription Scanner", desc: "Upload JPG, PNG, or PDF. Our AI reads even the messiest handwriting." },
  { icon: Pill, title: "Medicine Explained", desc: "Dosage, timing, side effects, warnings — decoded in plain English." },
  { icon: TrendingDown, title: "Compare Prices", desc: "Instantly compare across Tata 1mg, Apollo, PharmEasy, Netmeds and more." },
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "Ask anything about your medicines, in your own words." },
  { icon: Shield, title: "Private & Secure", desc: "End-to-end encryption. Your health data never leaves your account." },
  { icon: FileText, title: "Prescription History", desc: "All your prescriptions organized, searchable, and shareable." },
];

const plans = [
  { name: "Free", price: "₹0", desc: "Get started", features: ["3 scans / month", "Basic medicine info", "Price comparison"], cta: "Start free" },
  { name: "Pro", price: "₹299", desc: "For families", features: ["Unlimited scans", "Full medicine reports", "AI chat assistant", "Priority support"], cta: "Go Pro", highlight: true },
  { name: "Clinic", price: "₹1,999", desc: "For teams", features: ["Everything in Pro", "Up to 20 members", "Analytics dashboard", "Dedicated support"], cta: "Contact sales" },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60 dark:opacity-40">
          <div className="absolute top-20 -left-20 h-72 w-72 rounded-full blur-3xl gradient-primary opacity-40" />
          <div className="absolute top-40 right-0 h-96 w-96 rounded-full blur-3xl gradient-success opacity-30" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="outline" className="glass mb-4">
              <Sparkles className="h-3 w-3 mr-1 text-primary" /> Powered by Medical AI
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Understand Your{" "}
              <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                Prescription
              </span>{" "}
              with AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Upload your doctor's prescription and let AI explain every medicine, dosage, side effects, precautions,
              and compare medicine prices across trusted pharmacies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard/upload">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
                  Analyze Prescription <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="glass">Learn More</Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Check className="h-4 w-4 text-[color:var(--success)]" /> HIPAA-ready</div>
              <div className="flex items-center gap-1"><Check className="h-4 w-4 text-[color:var(--success)]" /> Trusted by 25k+ patients</div>
              <div className="flex items-center gap-1"><Check className="h-4 w-4 text-[color:var(--success)]" /> No ads, ever</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-3xl p-6 shadow-elegant">
              <div className="flex items-center gap-3 mb-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Dr. Anita Rao, MD</div>
                  <div className="text-xs text-muted-foreground">Apollo Hospital · 28 Jun 2026</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Paracetamol 650", freq: "1-0-1", days: "5 days", color: "from-blue-500 to-cyan-500" },
                  { name: "Azithromycin 500", freq: "1-0-0", days: "3 days", color: "from-emerald-500 to-teal-500" },
                  { name: "Pantoprazole 40", freq: "1-0-0", days: "14 days", color: "from-violet-500 to-blue-500" },
                ].map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between rounded-xl bg-background/60 p-3 border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${m.color} grid place-items-center text-white`}>
                        <Pill className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.freq} · {m.days}</div>
                      </div>
                    </div>
                    <Badge className="gradient-success text-secondary-foreground border-0 text-[10px]">
                      Analyzed
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 rounded-xl gradient-primary p-4 text-primary-foreground">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold">Save ₹184</span>
                  <span className="opacity-80">on Tata 1mg vs. Apollo</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 glass rounded-2xl p-3 flex items-center gap-2 shadow-elegant"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg gradient-success text-secondary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold">AI Analysis Complete</div>
                <div className="text-muted-foreground">3 medicines · 6 pharmacies</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="glass mb-3">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to understand your meds</h2>
          <p className="mt-3 text-muted-foreground">
            One platform to scan, understand, compare, and never overpay for medicine again.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass h-full hover:shadow-elegant transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="glass mb-3">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold">Simple, transparent pricing</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className={`glass h-full ${p.highlight ? "ring-2 ring-primary shadow-elegant" : ""}`}>
                <CardContent className="p-6">
                  {p.highlight && <Badge className="gradient-primary text-primary-foreground border-0 mb-3">Most popular</Badge>}
                  <div className="text-sm text-muted-foreground">{p.name}</div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{p.price}</span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[color:var(--success)]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="block mt-6">
                    <Button className={`w-full ${p.highlight ? "gradient-primary text-primary-foreground" : ""}`} variant={p.highlight ? "default" : "outline"}>
                      {p.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <div className="glass rounded-3xl p-10 text-center shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-10 -z-10" />
          <h2 className="text-3xl font-bold">Scan your first prescription in 60 seconds</h2>
          <p className="mt-3 text-muted-foreground">No credit card required. Start free.</p>
          <Link to="/register" className="inline-block mt-6">
            <Button size="lg" className="gradient-primary text-primary-foreground shadow-elegant">
              Get Started Free <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
