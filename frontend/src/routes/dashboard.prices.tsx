import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { medicines } from "@/lib/mock-data";
import { PriceCard } from "@/components/site/price-card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from "lucide-react";

export const Route = createFileRoute("/dashboard/prices")({
  component: PricesPage,
});

function PricesPage() {
  const [selectedId, setSelectedId] = useState(medicines[0].id);
  const med = medicines.find((m) => m.id === selectedId)!;
  const cheapest = med.prices.reduce((a, b) => (a.price < b.price ? a : b));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Price Comparison</h1>
          <p className="text-muted-foreground text-sm">Compare prices across 6 trusted online pharmacies.</p>
        </div>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-64 glass"><SelectValue /></SelectTrigger>
          <SelectContent>
            {medicines.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {med.prices.map((p, i) => (
          <PriceCard key={p.name} pharmacy={p} cheapest={p.name === cheapest.name} index={i} />
        ))}
      </div>

      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-3 font-semibold">Medicine</th>
                <th className="p-3 font-semibold">Website</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Availability</th>
                <th className="p-3 font-semibold">Delivery</th>
                <th className="p-3 font-semibold text-right">Buy</th>
              </tr>
            </thead>
            <tbody>
              {med.prices.map((p) => (
                <tr key={p.name} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="p-3">{med.name}</td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">
                    <span className="font-bold">₹{p.price}</span>
                    {p.name === cheapest.name && (
                      <Badge className="ml-2 gradient-success text-secondary-foreground border-0 text-[10px]"><Check className="h-3 w-3 mr-1" /> Cheapest</Badge>
                    )}
                  </td>
                  <td className="p-3"><Badge variant="outline">{p.availability}</Badge></td>
                  <td className="p-3 text-muted-foreground">{p.delivery}</td>
                  <td className="p-3 text-right">
                    <a href={p.url} target="_blank" rel="noreferrer">
                      <Button size="sm" variant={p.name === cheapest.name ? "default" : "outline"}>
                        Buy <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}