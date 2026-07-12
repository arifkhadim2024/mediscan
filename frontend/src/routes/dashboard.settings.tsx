import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
      </div>

      <Card className="glass">
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="gradient-primary text-primary-foreground text-2xl">RS</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => toast.success("Photo updated")}>Change photo</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>First name</Label><Input defaultValue="Rahul" /></div>
            <div className="space-y-2"><Label>Last name</Label><Input defaultValue="Sharma" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input type="email" defaultValue="rahul@example.com" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+91 98000 00000" /></div>
            <div className="space-y-2"><Label>Date of birth</Label><Input type="date" defaultValue="1994-03-12" /></div>
          </div>
          <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Saved")}>Save changes</Button>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Current password</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>New password</Label><Input type="password" /></div>
          <div className="space-y-2"><Label>Confirm new password</Label><Input type="password" /></div>
          <Button variant="outline" onClick={() => toast.success("Password updated")}>Update password</Button>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><div className="font-medium">Dark Mode</div><div className="text-sm text-muted-foreground">Switch between light and dark theme</div></div>
            <Switch checked={theme === "dark"} onCheckedChange={toggle} />
          </div>
          <div className="flex items-center justify-between">
            <div><div className="font-medium">Email notifications</div><div className="text-sm text-muted-foreground">Prescription reminders & updates</div></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><div className="font-medium">Price alerts</div><div className="text-sm text-muted-foreground">Notify me when prices drop</div></div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}