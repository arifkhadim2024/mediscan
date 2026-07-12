import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash2, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const data = await api.get<any[]>("/prescription/history");
      setPrescriptions(data);
    } catch (err: any) {
      toast.error("Failed to load history: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;
    try {
      await api.delete(`/prescription/${id}`);
      toast.success("Prescription deleted successfully");
      setPrescriptions((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      toast.error("Failed to delete: " + err.message);
    }
  };

  const mappedPrescriptions = prescriptions.map((p: any) => {
    const isAnalyzed = p.aiAnalysis && Object.keys(p.aiAnalysis).length > 0;
    const statusVal = isAnalyzed ? "Analyzed" : "Processing";
    
    const medicinesList = [];
    if (isAnalyzed && p.aiAnalysis.medicineName) {
      medicinesList.push({
        id: p._id + "-med",
        name: p.aiAnalysis.medicineName,
      });
    }

    return {
      id: p._id,
      date: p.createdAt ? p.createdAt.split("T")[0] : "Recent",
      doctor: p.aiAnalysis?.doctorNotes?.match(/Dr\.\s*[A-Za-z0-9_]+/)?.[0] || p.aiAnalysis?.doctorNotes || "Prescription Analysis",
      hospital: p.aiAnalysis?.doctorNotes?.includes("Hospital") ? p.aiAnalysis.doctorNotes : "MediScan AI Clinic",
      status: statusVal,
      medicines: medicinesList,
    };
  });

  const filtered = mappedPrescriptions.filter((p) => {
    const matchesQ = !q || p.doctor.toLowerCase().includes(q.toLowerCase()) ||
      p.medicines.some((m) => m.name.toLowerCase().includes(q.toLowerCase()));
    const matchesS = status === "all" || p.status.toLowerCase() === status;
    return matchesQ && matchesS;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Prescription History</h1>
        <p className="text-muted-foreground text-sm">All your uploads, searchable and organized.</p>
      </div>

      <Card className="glass">
        <CardContent className="p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search doctor or medicine..." className="pl-9" />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="analyzed">Analyzed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="glass overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            Loading history...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="p-3 font-semibold">Date</th>
                  <th className="p-3 font-semibold">Doctor</th>
                  <th className="p-3 font-semibold">Medicines</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border/50 hover:bg-muted/30">
                    <td className="p-3 whitespace-nowrap">{p.date}</td>
                    <td className="p-3">
                      <div className="font-medium truncate max-w-[200px]">{p.doctor}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.hospital}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {p.medicines.slice(0, 2).map((m) => (
                          <Badge key={m.id} variant="outline" className="text-[10px]">{m.name}</Badge>
                        ))}
                        {p.medicines.length === 0 && <span className="text-xs text-muted-foreground italic">No medicines found</span>}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={p.status === "Analyzed" ? "gradient-success text-secondary-foreground border-0" : ""} variant={p.status === "Analyzed" ? "default" : "secondary"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="inline-flex gap-1">
                        <Link to="/dashboard/prescription/$id" params={{ id: p.id }}>
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => toast.success("Downloaded")}><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No prescriptions found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}