import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Pill, Clock, Utensils, AlertTriangle, Share2, Bookmark, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Medicine } from "@/lib/mock-data";

export function MedicineCard({ medicine, index = 0 }: { medicine: Medicine; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="glass overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="flex gap-3 min-w-0">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Pill className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg truncate">{medicine.name}</h3>
              <p className="text-xs text-muted-foreground">{medicine.purpose}</p>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0">{medicine.dosage}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-muted-foreground">Frequency</div>
              <div className="font-semibold">{medicine.frequency}</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-muted-foreground">Duration</div>
              <div className="font-semibold">{medicine.duration}</div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <div className="text-muted-foreground flex items-center gap-1"><Utensils className="h-3 w-3" />Timing</div>
              <div className="font-semibold text-[11px]">{medicine.timing}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mb-1"><Clock className="h-3 w-3" /> How to take</div>
            <p className="text-sm">{medicine.howToTake}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            <div>
              <div className="font-semibold mb-1 flex items-center gap-1 text-secondary"><AlertTriangle className="h-3 w-3" />Side Effects</div>
              <div className="flex flex-wrap gap-1">
                {medicine.sideEffects.slice(0, 3).map((s) => (
                  <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1 flex items-center gap-1 text-destructive"><AlertTriangle className="h-3 w-3" />Warnings</div>
              <p className="text-[11px] text-muted-foreground line-clamp-2">{medicine.warnings.join(" · ")}</p>
            </div>
          </div>

          {medicine.alternatives.length > 0 && (
            <div className="text-xs">
              <span className="font-semibold text-muted-foreground">Alternatives: </span>
              <span>{medicine.alternatives.join(", ")}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
            <Link to="/dashboard/prices" className="flex-1 min-w-[140px]">
              <Button className="w-full gradient-success text-secondary-foreground" size="sm">
                <TrendingDown className="h-4 w-4 mr-1" /> Compare Prices
              </Button>
            </Link>
            <Link to="/dashboard/medicine/$id" params={{ id: medicine.id }}>
              <Button variant="outline" size="sm">Details</Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => toast.success("Saved to library")}>
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast.success("Share link copied")}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}