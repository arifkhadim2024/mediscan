import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft, Pill, Baby, Wine, Car, Droplet, HeartPulse, Utensils,
  ShieldAlert, Package, Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceCard } from "@/components/site/price-card";
import { findMedicine } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/medicine/$id")({
  component: MedicinePage,
  notFoundComponent: () => <div className="p-8">Medicine not found.</div>,
  errorComponent: ({ reset }) => {
    const r = useRouter();
    return (
      <div className="p-8">
        <p>Something went wrong.</p>
        <Button onClick={() => { r.invalidate(); reset(); }}>Retry</Button>
      </div>
    );
  },
});

function MedicinePage() {
  const { id } = Route.useParams();
  const m = findMedicine(id);
  if (!m) return <div className="p-8">Medicine not found.</div>;
  const cheapest = m.prices.reduce((a, b) => (a.price < b.price ? a : b));

  const warnings = [
    { icon: Baby, label: "Pregnancy", text: m.pregnancy },
    { icon: Wine, label: "Alcohol", text: m.alcohol },
    { icon: Car, label: "Driving", text: m.driving },
    { icon: Droplet, label: "Kidney", text: m.kidney },
    { icon: HeartPulse, label: "Liver", text: m.liver },
    { icon: Utensils, label: "Food", text: m.foodInteractions },
  ];

  return (
    <div className="space-y-6">
      <Link to="/dashboard/medicines">
        <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back to library</Button>
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass overflow-hidden">
          <div className="gradient-hero p-6 text-primary-foreground flex flex-wrap items-start gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Pill className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">{m.name}</h1>
              <p className="opacity-90 text-sm mt-1">{m.purpose}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-white/20 border-0 text-white">{m.dosage}</Badge>
                <Badge className="bg-white/20 border-0 text-white">{m.frequency}</Badge>
                <Badge className="bg-white/20 border-0 text-white">{m.duration}</Badge>
                <Badge className="bg-white/20 border-0 text-white">{m.timing}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">{m.description}</p>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-1"><Sparkles className="h-4 w-4 text-primary" /> Uses</h4>
              <div className="flex flex-wrap gap-1">
                {m.uses.map((u) => <Badge key={u} variant="outline">{u}</Badge>)}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {m.benefits.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-1"><ShieldAlert className="h-4 w-4 text-destructive" /> Side Effects</h4>
              <div className="flex flex-wrap gap-1">
                {m.sideEffects.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Package className="h-4 w-4" /> Storage</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">{m.storage}</CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Warnings & Interactions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {warnings.map((w) => (
            <Card key={w.label} className="glass hover:shadow-elegant transition-all hover:-translate-y-1">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
                    <w.icon className="h-4 w-4" />
                  </div>
                  {w.label} Warning
                </div>
                <p className="text-xs text-muted-foreground mt-2">{w.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Price across pharmacies</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {m.prices.map((p, i) => (
            <PriceCard key={p.name} pharmacy={p} cheapest={p.name === cheapest.name} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}