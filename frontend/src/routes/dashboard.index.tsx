import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FileText, Pill, IndianRupee, Upload, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/site/stat-card";
import { dashboardStats, prescriptions } from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, Rahul 👋</h1>
          <p className="text-muted-foreground text-sm">Here's an overview of your prescriptions and savings.</p>
        </div>
        <Link to="/dashboard/upload">
          <Button className="gradient-primary text-primary-foreground shadow-elegant">
            <Upload className="h-4 w-4 mr-1" /> Upload Prescription
          </Button>
        </Link>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Prescriptions" value={dashboardStats.totalPrescriptions} icon={FileText} trend="+3 this month" index={0} />
        <StatCard label="Medicines Analyzed" value={dashboardStats.medicinesAnalyzed} icon={Pill} trend="+8 this month" index={1} />
        <StatCard label="Total Savings" value={`₹${dashboardStats.savings}`} icon={IndianRupee} trend="vs. Apollo prices" index={2} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader><CardTitle>Weekly Activity</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardStats.activity}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.18 240)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.58 0.18 240)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.16 160)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.65 0.16 160)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area dataKey="medicines" stroke="oklch(0.65 0.16 160)" fill="url(#c2)" />
                <Area dataKey="prescriptions" stroke="oklch(0.58 0.18 240)" fill="url(#c1)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Prescriptions</CardTitle>
            <Link to="/dashboard/history" className="text-xs text-primary flex items-center gap-1">See all <ArrowRight className="h-3 w-3" /></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {prescriptions.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to="/dashboard/prescription/$id"
                params={{ id: p.id }}
                className="block rounded-xl p-3 hover:bg-muted/50 transition-colors border border-border/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{p.doctor}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.hospital}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0">{p.medicines.length} meds</Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{p.date}</div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}