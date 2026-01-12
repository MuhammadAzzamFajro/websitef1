import { Card } from "@/components/ui/card";
import { Users, Award, ChevronRight, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useStandings } from "@/hooks/useOpenF1";

const teams = [
  { name: "McLaren", base: "Woking, UK", teamPrincipal: "Andrea Stella", championships: 8, points: 756, drivers: ["Lando Norris", "Oscar Piastri"], color: "#FF8000", gradient: "from-orange-500 to-orange-600" },
  { name: "Mercedes", base: "Brackley, UK", teamPrincipal: "Toto Wolff", championships: 8, points: 398, drivers: ["George Russell", "Kimi Antonelli"], color: "#00D2BE", gradient: "from-teal-400 to-cyan-500" },
  { name: "Red Bull Racing", base: "Milton Keynes, UK", teamPrincipal: "Laurent Mekies", championships: 6, points: 366, drivers: ["Max Verstappen", "Yuki Tsunoda"], color: "#1E41FF", gradient: "from-blue-600 to-indigo-600" },
  { name: "Ferrari", base: "Maranello, Italia", teamPrincipal: "Frédéric Vasseur", championships: 16, points: 362, drivers: ["Charles Leclerc", "Lewis Hamilton"], color: "#DC0000", gradient: "from-red-600 to-red-700" },
  { name: "Williams", base: "Grove, UK", teamPrincipal: "James Vowles", championships: 9, points: 111, drivers: ["Carlos Sainz", "Alexander Albon"], color: "#005AFF", gradient: "from-blue-500 to-blue-600" },
  { name: "Racing Bulls", base: "Faenza, Italia", teamPrincipal: "Alan Permane", championships: 0, points: 79, drivers: ["Liam Lawson", "Isack Hadjar"], color: "#6692FF", gradient: "from-indigo-400 to-blue-500" },
  { name: "Aston Martin", base: "Silverstone, UK", teamPrincipal: "Mike Krack", championships: 0, points: 72, drivers: ["Fernando Alonso", "Lance Stroll"], color: "#006F62", gradient: "from-emerald-600 to-teal-600" },
  { name: "Haas F1 Team", base: "Kannapolis, USA", teamPrincipal: "Ayao Komatsu", championships: 0, points: 70, drivers: ["Esteban Ocon", "Oliver Bearman"], color: "#B6BABD", gradient: "from-gray-400 to-gray-500" },
  { name: "Kick Sauber", base: "Hinwil, Swiss", teamPrincipal: "Jonathan Wheatley", championships: 0, points: 62, drivers: ["Nico Hulkenberg", "Gabriel Bortoleto"], color: "#52E252", gradient: "from-green-400 to-emerald-500" },
  { name: "Alpine", base: "Enstone, UK", teamPrincipal: "Flavio Briatore", championships: 2, points: 22, drivers: ["Pierre Gasly", "Franco Colapinto"], color: "#0090FF", gradient: "from-sky-500 to-blue-500" },
];

interface TeamsSectionProps {
  limit?: number;
  showViewMore?: boolean;
}

const TeamsSection = ({ limit, showViewMore = false }: TeamsSectionProps) => {
  const navigate = useNavigate();
  const { teamStandings, isLoading } = useStandings(2025);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayedTeams = limit ? teamStandings?.slice(0, limit) : teamStandings;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-orange-600/10 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Constructors</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Tim{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Konstruktor
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Raksasa teknologi dari OpenF1 API untuk musim terbaru.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            [...Array(limit || 4)].map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse" />
            ))
          ) : (
            displayedTeams?.map((team, index) => {
              const teamColor = "#E10600"; // Fallback F1 Red
              const gradient = "from-red-600 to-red-700";
              
              return (
                <Card
                  key={team.team_name}
                  className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-[1.02] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 25px 80px -20px ${teamColor}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Top Color Bar */}
                  <div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`}
                  />
    
                  {/* Hover Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${teamColor}10, transparent 50%)`
                    }}
                  />
    
                  <div className="p-8 relative">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        {/* Team Name */}
                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                          {team.team_name}
                        </h3>
                        {/* Session Date */}
                        <div className="flex items-center gap-2 text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">Position: {team.position_current}</span>
                        </div>
                      </div>
    
                      {/* Championships Badge */}
                      <div 
                        className={`flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg`}
                        style={{ boxShadow: `0 10px 30px -10px ${teamColor}50` }}
                      >
                        <Award className="h-5 w-5 text-white" />
                        <span className="text-xl font-bold text-white">#{team.position_current}</span>
                      </div>
                    </div>
    
                    {/* Points Section */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Total Poin Musim 2025</span>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-4xl font-bold"
                            style={{ color: teamColor }}
                          >
                            {team.points_current}
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
    
                  {/* Animated shine effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                    style={{
                      background: `linear-gradient(105deg, transparent 40%, ${teamColor}10 45%, ${teamColor}20 50%, ${teamColor}10 55%, transparent 60%)`,
                      transform: 'translateX(-100%)',
                      animation: 'shine 1.5s ease-in-out',
                    }}
                  />
                </Card>
              );
            })
          )}
        </div>

        {/* View More Button */}
        {showViewMore && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate("/teams")}
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 h-14 px-10 overflow-hidden"
            >
              <span className="relative z-10">Lihat Selengkapnya</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default TeamsSection;
