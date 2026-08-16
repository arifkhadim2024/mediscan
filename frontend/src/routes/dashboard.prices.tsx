import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { medicines, getPharmacyUrl } from "@/lib/mock-data";
import { PriceCard } from "@/components/site/price-card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { api } from "@/lib/api";

const pricesSearchSchema = z.object({
  medicineId: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/prices")({
  validateSearch: (search) => pricesSearchSchema.parse(search),
  component: PricesPage,
});

function PricesPage() {
  const { medicineId } = Route.useSearch();
  const [selectedId, setSelectedId] = useState<string>("");
  const [allMedicines, setAllMedicines] = useState<any[]>(medicines);
  const [loading, setLoading] = useState(false);

  // Initialize selectedId from query param or default
  useEffect(() => {
    if (medicineId) {
      setSelectedId(medicineId);
    } else if (medicines.length > 0) {
      setSelectedId(medicines[0].id);
    }
  }, [medicineId]);

  // Load dynamic medicine if selectedId contains "-med-"
  useEffect(() => {
    const loadDynamic = async () => {
      if (selectedId && selectedId.includes("-med-")) {
        // If it's already in the list, don't load again
        if (allMedicines.find((m) => m.id === selectedId)) {
          return;
        }
        setLoading(true);
        try {
          const [prescriptionId, idxStr] = selectedId.split("-med-");
          const idx = parseInt(idxStr, 10);
          const data = await api.get<any>(`/prescription/${prescriptionId}`);
          
          const rawMedicines = data.aiAnalysis ? (Array.isArray(data.aiAnalysis) ? data.aiAnalysis : [data.aiAnalysis]) : [];
          const med = rawMedicines[idx];
          if (med) {
            const dynamicMed = {
              id: selectedId,
              name: med.medicineName,
              dosage: med.dosage || "As prescribed",
              frequency: med.frequency || "1-0-1",
              duration: med.duration || "N/A",
              purpose: med.purpose || "Medical Treatment",
              howToTake: med.beforeAfterFood || "As advised by doctor",
              timing: med.timing || "Anytime",
              sideEffects: med.possibleSideEffects || [],
              warnings: med.warnings || [],
              interactions: med.drugInteractions || [],
              alternatives: med.alternativeMedicines || [],
              description: `${med.genericName || med.medicineName} is used for ${med.purpose || 'treatment'}.`,
              uses: [med.purpose || "Treatment"],
              benefits: ["Effective relief"],
              storage: "Store in a cool dry place.",
              pregnancy: "Consult doctor.",
              alcohol: "Avoid alcohol.",
              driving: "Consult doctor.",
              kidney: "Consult doctor.",
              liver: "Consult doctor.",
              foodInteractions: "No significant interaction.",
              image: "/images/generic_medicine.png",
              prices: [
                { name: "Amazon Pharmacy", price: 120, availability: "In Stock", delivery: "2 days", url: getPharmacyUrl("Amazon Pharmacy", selectedId, med.medicineName), logoColor: "#FF9900" },
                { name: "Tata 1mg", price: 95, availability: "In Stock", delivery: "1 day", url: getPharmacyUrl("Tata 1mg", selectedId, med.medicineName), logoColor: "#F97316" },
                { name: "PharmEasy", price: 102, availability: "In Stock", delivery: "2 days", url: getPharmacyUrl("PharmEasy", selectedId, med.medicineName), logoColor: "#10B981" },
                { name: "Apollo Pharmacy", price: 110, availability: "In Stock", delivery: "Same day", url: getPharmacyUrl("Apollo Pharmacy", selectedId, med.medicineName), logoColor: "#0EA5E9" },
                { name: "Netmeds", price: 105, availability: "In Stock", delivery: "3 days", url: getPharmacyUrl("Netmeds", selectedId, med.medicineName), logoColor: "#EF4444" },
                { name: "Flipkart Health+", price: 100, availability: "In Stock", delivery: "3 days", url: getPharmacyUrl("Flipkart Health+", selectedId, med.medicineName), logoColor: "#2563EB" },
              ]
            };
            setAllMedicines((prev) => [...prev, dynamicMed]);
          }
        } catch (err) {
          console.error("Failed to load dynamic medicine for price comparison", err);
        } finally {
          setLoading(false);
        }
      }
    };
    loadDynamic();
  }, [selectedId, allMedicines]);

  // Find the selected medicine
  const med = allMedicines.find((m) => m.id === selectedId);

  if (loading || !med) {
    return (
      <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        Loading price comparison...
      </div>
    );
  }

  const cheapest = med.prices && med.prices.length > 0
    ? med.prices.reduce((a, b) => (a.price < b.price ? a : b))
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Price Comparison</h1>
          <p className="text-muted-foreground text-sm">Compare prices across trusted online pharmacies.</p>
        </div>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="w-64 glass"><SelectValue /></SelectTrigger>
          <SelectContent>
            {allMedicines.map((m) => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cheapest ? (
          med.prices.map((p: any, i: number) => (
            <PriceCard key={p.name} pharmacy={p} cheapest={p.name === cheapest.name} index={i} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic col-span-3">Product links unavailable</p>
        )}
      </div>

      {cheapest && (
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
                {med.prices.map((p: any) => (
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
      )}
    </div>
  );
}