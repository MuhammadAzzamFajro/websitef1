import { Flag } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">F1 Hub</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 F1 Hub. Informasi seputar Formula 1.
          </p>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Tentang</a>
            <a href="#" className="hover:text-primary transition-colors">Kontak</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
