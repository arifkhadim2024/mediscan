import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="grid h-14 w-14 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant"
      >
        <Activity className="h-6 w-6" />
      </motion.div>
      <div className="text-sm text-muted-foreground animate-pulse">{label}</div>
    </div>
  );
}