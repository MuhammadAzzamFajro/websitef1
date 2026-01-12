import { Button } from "@/components/ui/button";
import { ChevronRight, Play, Zap, Trophy, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMeetings } from "@/hooks/useOpenF1";


const Hero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: meetings } = useMeetings(2025);

  const nextRace = meetings?.find(m => new Date(m.date_start) > new Date());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-[#0a0a0a] to-orange-950/30" />
        
        {/* Floating Orbs - MetaMask Style */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-float-slow"
          style={{
            background: "radial-gradient(circle, #e11d48 0%, transparent 70%)",
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-float-medium"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-25 blur-[80px] animate-float-fast"
          style={{
            background: "radial-gradient(circle, #dc2626 0%, transparent 70%)",
            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-line-move" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-line-move-reverse" />
        </svg>
      </div>

      {/* Floating Stats Cards */}
      <div className="absolute top-20 right-10 md:right-20 animate-float-slow hidden lg:block">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Juara Dunia 2025</p>
              <p className="text-lg font-bold text-white">Lando Norris</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-10 md:left-20 animate-float-medium hidden lg:block">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Timer className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Balapan Berikutnya</p>
              <p className="text-lg font-bold text-white">{nextRace ? nextRace.meeting_name : "GP Australia"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-1/4 animate-float-fast hidden xl:block">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-lg font-bold text-green-400">LIVE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge dengan animasi */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-full animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-semibold text-sm">MUSIM 2025 AKTIF</span>
          </div>
          
          {/* Main Title dengan animasi staggered */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Informasi
            </span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x" style={{ animationDelay: "0.2s" }}>
              Seputar
            </span>
            <span className="block text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Formula 1
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            Saksikan aksi balap tercepat di dunia. Informasi lengkap tentang pembalap, tim, jadwal balapan, dan klasemen terbaru.
          </p>
          
          {/* Buttons dengan hover effects premium */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/schedule")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Lihat Jadwal Balapan
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
            
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-green-600/25 hover:shadow-green-600/40 transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/live")}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-5 h-5 animate-pulse" />
                Live Data
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group relative overflow-hidden border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm text-white px-8 py-6 text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://www.youtube.com/@Formula1", "_blank")}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Tonton Highlights
            </Button>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {[
              { value: "24", label: "Balapan" },
              { value: "10", label: "Tim" },
              { value: "20", label: "Pembalap" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <p className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-orange-400 transition-all duration-300">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/40 rounded-full animate-scroll-indicator" />
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes line-move {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scroll-indicator {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-line-move { stroke-dasharray: 1000; animation: line-move 20s linear infinite; }
        .animate-line-move-reverse { stroke-dasharray: 1000; animation: line-move 20s linear infinite reverse; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
