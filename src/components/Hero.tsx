import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/f1-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Formula 1 Racing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary font-semibold text-sm">MUSIM 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Informasi
            <br />
            <span className="text-primary">Seputar</span>
            <br />
            <span className="text-muted-foreground">Formula 1</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Saksikan aksi balap tercepat di dunia. Informasi lengkap tentang pembalap, tim, jadwal balapan, dan klasemen terbaru.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="group"
              onClick={() => navigate("/schedule")}
            >
              Lihat Jadwal Balapan
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-foreground/20 hover:bg-foreground/10"
              onClick={() => {
                window.open(
                  "https://www.youtube.com/@Formula1",
                  "_blank"
                )
              }}
              >
              <Play className="mr-2 h-5 w-5" />
              Tonton Highlights
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
