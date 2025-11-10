import DriversSection from "@/components/DriversSection";
import Footer from "@/components/Footer";

const Drivers = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-background to-muted/20 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <a 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            ← Kembali ke Beranda
          </a>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Semua Pembalap <span className="text-primary">F1 2025</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Daftar lengkap pembalap Formula 1 musim 2025
          </p>
        </div>
      </div>
      <DriversSection />
      <Footer />
    </div>
  );
};

export default Drivers;
