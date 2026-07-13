import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/site/dashboard-sidebar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !api.getToken()) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({ meta: [{ title: "Dashboard · MediScan AI" }] }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    const user = api.getUser();
    if (user?.name) {
      const parts = user.name.split(" ");
      const ini = parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
      setInitials(ini);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center gap-3 px-4 glass border-b border-border/50">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
            </Avatar>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}