import { motion } from "framer-motion";
import { Truck, Check, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Pharmacy } from "@/lib/mock-data";

export function PriceCard({ pharmacy, cheapest, index = 0 }: { pharmacy: Pharmacy; cheapest: boolean; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-elegant ${cheapest ? "ring-2 ring-[color:var(--success)]" : ""}`}>
        {cheapest && (
          <div className="absolute top-3 right-3">
            <Badge className="gradient-success text-secondary-foreground border-0">
              <Check className="h-3 w-3 mr-1" /> Cheapest
            </Badge>
          </div>
        )}
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg grid place-items-center text-white font-bold text-sm"
              style={{ backgroundColor: pharmacy.logoColor }}
            >
              {pharmacy.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{pharmacy.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Truck className="h-3 w-3" /> {pharmacy.delivery}
              </div>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold">₹{pharmacy.price}</span>
            </div>
            <Badge variant={pharmacy.availability === "In Stock" ? "outline" : "secondary"} className="text-[10px]">
              {pharmacy.availability}
            </Badge>
          </div>
          <a href={pharmacy.url} target="_blank" rel="noreferrer" className="block">
            <Button className="w-full" variant={cheapest ? "default" : "outline"}>
              Buy Now <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}