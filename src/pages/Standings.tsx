import StandingsPreview from "@/components/StandingsPreview";
import Footer from "@/components/Footer";

const Standings = () => {
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
            Klasemen <span className="text-primary">Pembalap 2025</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Posisi lengkap klasemen kejuaraan dunia Formula 1
          </p>
        </div>
      </div>
      <StandingsPreview />
      <Footer />
    </div>
  );
};

export default Standings;
