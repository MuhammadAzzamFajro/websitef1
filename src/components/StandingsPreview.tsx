import { Card } from "@/components/ui/card";
import { Trophy, TrendingUp, ChevronRight, Medal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useStandings } from "@/hooks/useOpenF1";

const standings = [
  { position: 1, name: "Lando Norris", team: "McLaren", points: 390, nationality: "🇬🇧", change: "up" },
  { position: 2, name: "Oscar Piastri", team: "McLaren", points: 366, nationality: "🇦🇺", change: "up" },
  { position: 3, name: "Max Verstappen", team: "Red Bull Racing", points: 341, nationality: "🇳🇱", change: "down" },
  { position: 4, name: "George Russell", team: "Mercedes", points: 276, nationality: "🇬🇧", change: "same" },
  { position: 5, name: "Charles Leclerc", team: "Ferrari", points: 214, nationality: "🇲🇨", change: "up" },
  { position: 6, name: "Lewis Hamilton", team: "Ferrari", points: 148, nationality: "🇬🇧", change: "down" },
  { position: 7, name: "Kimi Antonelli", team: "Mercedes", points: 122, nationality: "🇮🇹", change: "up" },
  { position: 8, name: "Alexander Albon", team: "Williams", points: 73, nationality: "🇹🇭", change: "same" },
  { position: 9, name: "Nico Hülkenberg", team: "Sauber", points: 43, nationality: "🇩🇪", change: "up" },
  { position: 10, name: "Isack Hadjar", team: "Racing Bulls", points: 43, nationality: "🇫🇷", change: "same" },
  { position: 11, name: "Oliver Bearman", team: "Haas", points: 40, nationality: "🇬🇧", change: "up" },
  { position: 12, name: "Fernando Alonso", team: "Aston Martin", points: 40, nationality: "🇪🇸", change: "down" },
  { position: 13, name: "Carlos Sainz", team: "Williams", points: 38, nationality: "🇪🇸", change: "same" },
  { position: 14, name: "Liam Lawson", team: "Racing Bulls", points: 36, nationality: "🇳🇿", change: "up" },
  { position: 15, name: "Lance Stroll", team: "Aston Martin", points: 32, nationality: "🇨🇦", change: "down" },
  { position: 16, name: "Esteban Ocon", team: "Haas", points: 30, nationality: "🇫🇷", change: "same" },
  { position: 17, name: "Yuki Tsunoda", team: "Red Bull Racing", points: 28, nationality: "🇯🇵", change: "up" },
  { position: 18, name: "Pierre Gasly", team: "Alpine", points: 22, nationality: "🇫🇷", change: "same" },
  { position: 19, name: "Gabriel Bortoleto", team: "Sauber", points: 19, nationality: "🇧🇷", change: "up" },
  { position: 20, name: "Franco Colapinto", team: "Alpine", points: 0, nationality: "🇦🇷", change: "same" },
];

interface StandingsPreviewProps {
  limit?: number;
  showViewMore?: boolean;
}

const StandingsPreview = ({ limit, showViewMore = false }: StandingsPreviewProps) => {
  const navigate = useNavigate();
  const { driverStandings, isLoading } = useStandings(2025);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const displayedStandings = limit ? driverStandings?.slice(0, limit) : driverStandings;
  const maxPoints = driverStandings && driverStandings.length > 0 
    ? Math.max(...driverStandings.map(s => s.points_current)) 
    : 1;

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

  const getPositionStyle = (position: number) => {
    if (position === 1) return { bg: "from-yellow-500 to-amber-600", text: "text-yellow-500", shadow: "shadow-yellow-500/30" };
    if (position === 2) return { bg: "from-gray-300 to-gray-400", text: "text-gray-300", shadow: "shadow-gray-400/30" };
    if (position === 3) return { bg: "from-orange-500 to-orange-600", text: "text-orange-500", shadow: "shadow-orange-500/30" };
    return { bg: "from-white/10 to-white/5", text: "text-gray-400", shadow: "" };
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-red-600/5 via-transparent to-orange-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Driver Standings</span>
              <h2 className="text-4xl md:text-5xl font-bold">
                Klasemen{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Pembalap
                </span>
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-xl ml-16">
            Posisi terkini dari OpenF1 API untuk musim terbaru.
          </p>
        </div>

        {/* Standings Table */}
        <Card className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                  <th className="text-left p-5 font-semibold text-gray-400 text-sm uppercase tracking-wider">Pos</th>
                  <th className="text-left p-5 font-semibold text-gray-400 text-sm uppercase tracking-wider">Pembalap</th>
                  <th className="text-left p-5 font-semibold text-gray-400 text-sm uppercase tracking-wider hidden md:table-cell">Tim</th>
                  <th className="text-left p-5 font-semibold text-gray-400 text-sm uppercase tracking-wider hidden lg:table-cell">Progress</th>
                  <th className="text-right p-5 font-semibold text-gray-400 text-sm uppercase tracking-wider">Poin</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  [...Array(limit || 5)].map((_, i) => (
                    <tr key={i} className="border-b border-white/5 animate-pulse">
                      <td colSpan={5} className="p-10 text-center text-gray-500">Loading data...</td>
                    </tr>
                  ))
                ) : (
                  displayedStandings?.map((driver, index) => {
                    const posStyle = getPositionStyle(driver.position_current);
                    const progressWidth = (driver.points_current / maxPoints) * 100;
                    
                    return (
                      <tr
                        key={driver.driver_number}
                        className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-all duration-300 group cursor-pointer ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                        style={{ transitionDelay: `${index * 80}ms` }}
                      >
                        {/* Position */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${posStyle.bg} flex items-center justify-center font-bold text-white shadow-lg ${posStyle.shadow} group-hover:scale-110 transition-transform`}>
                              {driver.position_current <= 3 ? (
                                <Medal className="w-5 h-5" />
                              ) : (
                                driver.position_current
                              )}
                            </div>
                            {driver.position_current <= 3 && (
                              <span className={`text-2xl font-bold ${posStyle.text}`}>
                                {driver.position_current}
                              </span>
                            )}
                          </div>
                        </td>
                        
                        {/* Driver Name */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
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
                            <div>
                              <span className="font-bold text-white text-lg group-hover:text-red-400 transition-colors">
                                {driver.full_name}
                              </span>
                              <span className="text-gray-500 text-sm block md:hidden">
                                {driver.team_name}
                              </span>
                            </div>
                          </div>
                        </td>
                        
                        {/* Team */}
                        <td className="p-5 hidden md:table-cell">
                          <span className="text-gray-400">{driver.team_name}</span>
                        </td>
                        
                        {/* Progress Bar */}
                        <td className="p-5 hidden lg:table-cell">
                          <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out`}
                              style={{ 
                                width: isVisible ? `${progressWidth}%` : '0%',
                                transitionDelay: `${index * 100 + 500}ms`
                              }}
                            />
                          </div>
                        </td>
                        
                        {/* Points */}
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className={`text-3xl font-bold ${driver.position_current === 1 ? 'text-yellow-500' : driver.position_current === 2 ? 'text-gray-300' : driver.position_current === 3 ? 'text-orange-500' : 'text-white'} group-hover:scale-110 transition-transform`}>
                              {driver.points_current}
                            </span>
                            <div className={`transition-all duration-300 ${
                              driver.points_current > driver.points_start ? 'text-green-500' : 
                              driver.points_current < driver.points_start ? 'text-red-500' : 'text-gray-500'
                            }`}>
                              {driver.points_current > driver.points_start && <TrendingUp className="w-4 h-4" />}
                              {driver.points_current < driver.points_start && <TrendingUp className="w-4 h-4 rotate-180" />}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* View More Button */}
        {showViewMore && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate("/standings")}
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 h-14 px-10 overflow-hidden"
            >
              <span className="relative z-10">Lihat Klasemen Lengkap</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StandingsPreview;
