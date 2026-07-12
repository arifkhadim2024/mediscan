import { createFileRoute } from "@tanstack/react-router";
import { medicines } from "@/lib/mock-data";
import { MedicineCard } from "@/components/site/medicine-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/medicines")({
  component: MedicinesPage,
});

function MedicinesPage() {
  const [q, setQ] = useState("");
  const filtered = medicines.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Medicine Library</h1>
        <p className="text-muted-foreground text-sm">Every medicine you've been prescribed, in one place.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search medicine..." className="pl-9 glass" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
        {filtered.map((m, i) => <MedicineCard key={m.id} medicine={m} index={i} />)}
      </div>
    </div>
  );
}