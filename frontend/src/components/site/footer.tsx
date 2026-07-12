import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 bg-muted/30 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            MediScan AI
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            AI-powered prescription analysis and pharmacy price comparison.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Features</li><li>Pricing</li><li>Roadmap</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Blog</li><li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@mediscan.ai</li><li>+91 80 4000 0000</li><li>Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        © 2026 MediScan AI. Not a substitute for professional medical advice.
      </div>
    </footer>
  );
}