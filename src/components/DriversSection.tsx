import { Card } from "@/components/ui/card"
import { Trophy, Flag, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useStandings } from "@/hooks/useOpenF1";

const drivers = [
  { name: "Lando Norris", number: "4", team: "McLaren", nationality: "Inggris", wins: 10, points: 1800, teamColor: "#FF8000" },
  { name: "Oscar Piastri", number: "81", team: "McLaren", nationality: "Australia", wins: 9, points: 700, teamColor: "#FF8000" },
  { name: "Max Verstappen", number: "1", team: "Red Bull Racing", nationality: "Belanda", wins: 65, points: 3200, teamColor: "#1E41FF" },
  { name: "George Russell", number: "63", team: "Mercedes", nationality: "Inggris", wins: 5, points: 900, teamColor: "#00D2BE" },
  { name: "Charles Leclerc", number: "16", team: "Ferrari", nationality: "Monaco", wins: 8, points: 1400, teamColor: "#DC0000" },
  { name: "Lewis Hamilton", number: "44", team: "Ferrari", nationality: "Inggris", wins: 105, points: 5010, teamColor: "#DC0000" },
  { name: "Kimi Antonelli", number: "12", team: "Mercedes", nationality: "Italia", wins: 0, points: 122, teamColor: "#00D2BE" },
  { name: "Alexander Albon", number: "23", team: "Williams", nationality: "Thailand", wins: 0, points: 270, teamColor: "#005AFF" },
  { name: "Nico Hulkenberg", number: "27", team: "Kick Sauber", nationality: "Jerman", wins: 0, points: 550, teamColor: "#52E252" },
  { name: "Isack Hadjar", number: "55", team: "Racing Bulls", nationality: "Prancis", wins: 0, points: 43, teamColor: "#6692FF" },
  { name: "Oliver Bearman", number: "87", team: "Haas F1 Team", nationality: "Inggris", wins: 0, points: 40, teamColor: "#B6BABD" },
  { name: "Fernando Alonso", number: "14", team: "Aston Martin", nationality: "Spanyol", wins: 32, points: 2400, teamColor: "#006F62" },
  { name: "Carlos Sainz", number: "55", team: "Williams", nationality: "Spanyol", wins: 4, points: 1300, teamColor: "#005AFF" },
  { name: "Liam Lawson", number: "30", team: "Racing Bulls", nationality: "Selandia Baru", wins: 0, points: 50, teamColor: "#6692FF" },
  { name: "Lance Stroll", number: "18", team: "Aston Martin", nationality: "Kanada", wins: 0, points: 300, teamColor: "#006F62" },
  { name: "Esteban Ocon", number: "31", team: "Haas F1 Team", nationality: "Prancis", wins: 1, points: 450, teamColor: "#B6BABD" },
  { name: "Yuki Tsunoda", number: "22", team: "Red Bull Racing", nationality: "Jepang", wins: 0, points: 170, teamColor: "#1E41FF" },
  { name: "Pierre Gasly", number: "10", team: "Alpine", nationality: "Prancis", wins: 1, points: 440, teamColor: "#0090FF" },
  { name: "Gabriel Bortoleto", number: "5", team: "Kick Sauber", nationality: "Brasil", wins: 0, points: 19, teamColor: "#52E252" },
  { name: "Franco Colapinto", number: "43", team: "Alpine", nationality: "Argentina", wins: 0, points: 5, teamColor: "#0090FF" },
];

interface DriversSectionProps {
  limit?: number;
  showViewMore?: boolean;
}

const DriversSection = ({ limit, showViewMore = false }: DriversSectionProps) => {
  const navigate = useNavigate();
  const { driverStandings, isLoading } = useStandings(2025); // Updated to 2025 for latest lineups
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayedDrivers = limit ? driverStandings?.slice(0, limit) : driverStandings;

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
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Driver Lineup</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Pembalap{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              2024-2025
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Statistik langsung dari OpenF1 API untuk musim terbaru.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(limit || 6)].map((_, i) => (
              <div key={i} className="h-[300px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Driver Cards Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDrivers?.map((driver, index) => {
              const teamColor = driver.team_colour ? `#${driver.team_colour}` : "#FF0000";
              return (
                <Card
                  key={driver.driver_number + (driver.full_name || "")}
                  className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px -15px ${teamColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `none`;
                  }}
                >
                  {/* Team Color Accent */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ background: teamColor }}
                  />

                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      background: `radial-gradient(circle at 50% 0%, ${teamColor}15, transparent 70%)`
                    }}
                  />

                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Driver Number */}
                        <div 
                          className="text-7xl font-bold mb-2 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-2"
                          style={{ 
                            color: `${teamColor}30`,
                            textShadow: `0 0 40px ${teamColor}20`
                          }}
                        >
                          {driver.driver_number}
                        </div>
                        
                        {/* Driver Name */}
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                          {driver.full_name}
                        </h3>
                        
                        {/* Team */}
                        <p 
                          className="text-sm font-medium transition-colors"
                          style={{ color: teamColor }}
                        >
                          {driver.team_name}
                        </p>
                      </div>

                      {/* Headshot */}
                      {driver.headshot_url && (
                        <div className="relative group-hover:scale-110 transition-transform duration-500">
                           <img 
                            src={driver.headshot_url} 
                            alt={driver.full_name} 
                            className="w-24 h-24 object-contain rounded-xl"
                          />
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 group/stat">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/stat:scale-110"
                          style={{ backgroundColor: `${teamColor}20` }}
                        >
                          <Trophy className="h-4 w-4" style={{ color: teamColor }} />
                        </div>
                        <div>
                          <span className="text-lg font-bold text-white">{driver.position_current}</span>
                          <span className="text-xs text-gray-500 ml-1">Rank</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 group/stat">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/stat:scale-110"
                          style={{ backgroundColor: `${teamColor}20` }}
                        >
                          <Flag className="h-4 w-4" style={{ color: teamColor }} />
                        </div>
                        <div>
                          <span className="text-lg font-bold text-white">{driver.points_current}</span>
                          <span className="text-xs text-gray-500 ml-1">Poin</span>
                        </div>
                      </div>
                    </div>

                    {/* Nationality Badge */}
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                      <span className="text-lg">
                        {driver.country_code === 'NED' ? '🇳🇱' : 
                         driver.country_code === 'GBR' ? '🇬🇧' : 
                         driver.country_code === 'MON' ? '🇲🇨' : 
                         driver.country_code === 'ESP' ? '🇪🇸' : 
                         driver.country_code === 'AUS' ? '🇦🇺' : 
                         driver.country_code === 'FRA' ? '🇫🇷' : 
                         driver.country_code === 'GER' ? '🇩🇪' : 
                         driver.country_code === 'JPN' ? '🇯🇵' : 
                         driver.country_code === 'CAN' ? '🇨🇦' : 
                         driver.country_code === 'THA' ? '🇹🇭' : '🏁'}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{driver.country_code}</span>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                    style={{
                      background: `linear-gradient(90deg, transparent, ${teamColor}40, transparent)`,
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite',
                    }}
                  />
                </Card>
              );
            })}
          </div>
        )}

        {/* View More Button */}
        {showViewMore && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={() => navigate('/drivers')}
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 h-14 px-10 overflow-hidden"
            >
              <span className="relative z-10">Lihat Selengkapnya</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default DriversSection;
