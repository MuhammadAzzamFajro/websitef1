import RaceCalendar from "@/components/RaceCalendar";
import Footer from "@/components/Footer";

const Schedule = () => {
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
            Kalender <span className="text-primary">Lengkap</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Jadwal lengkap semua Grand Prix Formula 1 musim 2025
          </p>
        </div>
      </div>
      <RaceCalendar />
      <Footer />
    </div>
  );
};

export default Schedule;