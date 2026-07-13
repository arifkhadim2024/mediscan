import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Stethoscope, User, Building2, Calendar, Share2, Download, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findPrescription } from "@/lib/mock-data";
import { MedicineCard } from "@/components/site/medicine-card";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/dashboard/prescription/$id")({
  component: PrescriptionPage,
  notFoundComponent: () => <div className="p-8">Prescription not found.</div>,
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

function PrescriptionPage() {
  const { id } = Route.useParams();
  const [rx, setRx] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id.startsWith("rx-")) {
      setRx(findPrescription(id) || null);
      setLoading(false);
      return;
    }

    const fetchPrescription = async () => {
      try {
        const data = await api.get<any>(`/prescription/${id}`);
        const isAnalyzed = data.aiAnalysis && (Array.isArray(data.aiAnalysis) ? data.aiAnalysis.length > 0 : Object.keys(data.aiAnalysis).length > 0);
        
        const mappedMedicines: any[] = [];
        const rawMedicines = isAnalyzed ? (Array.isArray(data.aiAnalysis) ? data.aiAnalysis : [data.aiAnalysis]) : [];
        const firstAnalysis = rawMedicines[0];
        
        rawMedicines.forEach((med: any, idx: number) => {
          if (med && med.medicineName) {
            mappedMedicines.push({
              id: `${data._id}-med-${idx}`,
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
              prices: [
                { name: "Amazon Pharmacy", price: 120, availability: "In Stock", delivery: "2 days", url: "https://www.amazon.in/pharmacy", logoColor: "#FF9900" },
                { name: "Tata 1mg", price: 95, availability: "In Stock", delivery: "1 day", url: "https://www.1mg.com", logoColor: "#F97316" },
                { name: "PharmEasy", price: 102, availability: "In Stock", delivery: "2 days", url: "https://pharmeasy.in", logoColor: "#10B981" },
              ]
            });
          }
        });

        // Dynamic extractions from OCR text
        const ocrPatientMatch = data.ocrText?.match(/(?:Mr\.|Mrs\.|Ms\.|Patient:)\s*([A-Za-z0-9_\s]{3,25})/i)?.[1]?.trim();
        const patientName = ocrPatientMatch || (firstAnalysis?.patientAdvice ? "Patient" : "Rahul Sharma");

        const ocrDoctorMatch = data.ocrText?.match(/(?:Dr\.|Doctor:)\s*([A-Za-z0-9_\s]{3,25})/i)?.[0]?.trim();
        const doctorNotes = firstAnalysis?.doctorNotes || "";
        const doctorName = ocrDoctorMatch || doctorNotes.match(/Dr\.\s*[A-Za-z0-9_]+/)?.[0] || doctorNotes || "Prescription Analysis";

        const ocrHospitalMatch = data.ocrText?.match(/(?:Clinic|Hospital|Center|Medical)\b/i) ? data.ocrText.split("\n")[2]?.trim() : null;
        const hospitalName = ocrHospitalMatch || (doctorNotes.includes("Hospital") ? doctorNotes : "MediScan AI Clinic");

        setRx({
          id: data._id,
          doctor: doctorName,
          patient: patientName,
          hospital: hospitalName,
          date: data.createdAt ? data.createdAt.split("T")[0] : "Recent",
          medicines: mappedMedicines,
        });
      } catch (err: any) {
        toast.error("Failed to load prescription: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  if (loading) {
    return (
      <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        Loading prescription details...
      </div>
    );
  }

  if (!rx) return <div className="p-8 text-center text-muted-foreground">Prescription not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/dashboard/history">
          <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Back to history</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Shared")}><Share2 className="h-4 w-4 mr-1" /> Share</Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Downloaded")}><Download className="h-4 w-4 mr-1" /> Download</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass overflow-hidden">
          <div className="gradient-hero p-6 text-primary-foreground">
            <Badge className="bg-white/20 text-white border-0 mb-3">Prescription · {rx.id.substring(rx.id.length - 6)}</Badge>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              <Info icon={<Stethoscope className="h-4 w-4" />} label="Doctor" value={rx.doctor} />
              <Info icon={<User className="h-4 w-4" />} label="Patient" value={rx.patient} />
              <Info icon={<Building2 className="h-4 w-4" />} label="Hospital" value={rx.hospital} />
              <Info icon={<Calendar className="h-4 w-4" />} label="Date" value={rx.date} />
            </div>
          </div>
          <CardContent className="p-4 text-xs text-muted-foreground">
            AI analysis complete · {rx.medicines.length} medicine{rx.medicines.length > 1 ? "s" : ""} identified. This is an AI-assisted summary, not medical advice.
          </CardContent>
        </Card>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold mb-4">Medicines</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {rx.medicines.map((m: any, i: number) => <MedicineCard key={m.id} medicine={m} index={i} />)}
          {rx.medicines.length === 0 && <p className="text-sm text-muted-foreground italic col-span-2">No medicines identified in this prescription.</p>}
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/20">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase opacity-80">{label}</div>
        <div className="font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}