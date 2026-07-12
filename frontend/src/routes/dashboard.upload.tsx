import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { UploadCloud, FileImage, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/site/loading";

import { api } from "@/lib/api";

export const Route = createFileRoute("/dashboard/upload")({
  component: UploadPage,
});

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"idle" | "uploading" | "analyzing">("idle");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = async (f: File) => {
    if (!/(png|jpe?g|pdf)$/i.test(f.name)) {
      toast.error("Only JPG, PNG, or PDF");
      return;
    }
    setFile(f);
    setPhase("uploading");
    setProgress(15);
    
    try {
      // 1. Upload prescription file
      setProgress(40);
      const uploadRes = await api.upload<{ prescription: { _id: string } }>("/prescription/upload", f);
      setProgress(70);

      // 2. Perform AI analysis
      setPhase("analyzing");
      const analyzeRes = await api.post<{ prescription: { _id: string } }>("/prescription/analyze", {
        prescriptionId: uploadRes.prescription._id
      });
      setProgress(100);

      toast.success("Analysis complete");
      navigate({ to: "/dashboard/prescription/$id", params: { id: analyzeRes.prescription._id } });
    } catch (err: any) {
      toast.error(err.message || "Failed to process prescription");
      setPhase("idle");
      setFile(null);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Upload Prescription</h1>
        <p className="text-muted-foreground text-sm">Drag & drop or select. Supported: JPG, PNG, PDF.</p>
      </div>

      <Card className="glass">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          onClick={() => phase === "idle" && inputRef.current?.click()}
          className={`m-4 rounded-2xl border-2 border-dashed p-10 transition-all ${dragOver ? "border-primary bg-primary/5" : "border-border"} ${phase === "idle" ? "cursor-pointer hover:border-primary hover:bg-primary/5" : ""}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,application/pdf"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">Drop your prescription here</h3>
                <p className="text-sm text-muted-foreground mt-1">or click to browse from your device</p>
                <div className="mt-4 flex justify-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-muted">JPG</span>
                  <span className="px-2 py-1 rounded bg-muted">PNG</span>
                  <span className="px-2 py-1 rounded bg-muted">PDF</span>
                </div>
              </motion.div>
            )}

            {phase === "uploading" && file && (
              <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground">
                    <FileImage className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setFile(null); setPhase("idle"); }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={progress} />
                <div className="text-xs text-muted-foreground text-center">Uploading... {progress}%</div>
              </motion.div>
            )}

            {phase === "analyzing" && (
              <motion.div key="an" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <LoadingSpinner label="Analyzing Prescription..." />
                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3" /> Extracting medicines, dosages, and warnings
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3 text-sm">
        {["End-to-end encrypted", "OCR + AI powered", "Results in ~10s"].map((t) => (
          <div key={t} className="glass rounded-xl p-3 text-center">{t}</div>
        ))}
      </div>
    </div>
  );
}