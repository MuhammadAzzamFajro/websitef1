import { Card } from "@/components/ui/card";
import { Calendar, MapPin, ChevronRight, Flag, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMeetings } from "@/hooks/useOpenF1";

const races = [
  { round: 1, name: "Australian Grand Prix", location: "Melbourne", country: "Australia", date: "14-16 Mar 2025", status: "completed", flag: "🇦🇺" },
  { round: 2, name: "Chinese Grand Prix", location: "Shanghai", country: "China", date: "21-23 Mar 2025", status: "completed", flag: "🇨🇳" },
  { round: 3, name: "Japanese Grand Prix", location: "Suzuka", country: "Japan", date: "4-6 Apr 2025", status: "completed", flag: "🇯🇵" },
  { round: 4, name: "Bahrain Grand Prix", location: "Sakhir", country: "Bahrain", date: "11-13 Apr 2025", status: "completed", flag: "🇧🇭" },
  { round: 5, name: "Saudi Arabian Grand Prix", location: "Jeddah", country: "Saudi Arabia", date: "18-20 Apr 2025", status: "completed", flag: "🇸🇦" },
  { round: 6, name: "Miami Grand Prix", location: "Miami", country: "USA", date: "2-4 Mei 2025", status: "completed", flag: "🇺🇸" },
  { round: 7, name: "Emilia Romagna Grand Prix", location: "Imola", country: "Italy", date: "9-11 Mei 2025", status: "completed", flag: "🇮🇹" },
  { round: 8, name: "Monaco Grand Prix", location: "Monte Carlo", country: "Monaco", date: "23-25 Mei 2025", status: "completed", flag: "🇲🇨" },
  { round: 9, name: "Spanish Grand Prix", location: "Barcelona", country: "Spain", date: "6-8 Jun 2025", status: "completed", flag: "🇪🇸" },
  { round: 10, name: "Canadian Grand Prix", location: "Montreal", country: "Canada", date: "13-15 Jun 2025", status: "completed", flag: "🇨🇦" },
  { round: 11, name: "Austrian Grand Prix", location: "Spielberg", country: "Austria", date: "27-29 Jun 2025", status: "completed", flag: "🇦🇹" },
  { round: 12, name: "British Grand Prix", location: "Silverstone", country: "United Kingdom", date: "4-6 Jul 2025", status: "completed", flag: "🇬🇧" },
  { round: 13, name: "Hungarian Grand Prix", location: "Budapest", country: "Hungary", date: "18-20 Jul 2025", status: "completed", flag: "🇭🇺" },
  { round: 14, name: "Belgian Grand Prix", location: "Spa-Francorchamps", country: "Belgium", date: "25-27 Jul 2025", status: "completed", flag: "🇧🇪" },
  { round: 15, name: "Dutch Grand Prix", location: "Zandvoort", country: "Netherlands", date: "1-3 Aug 2025", status: "completed", flag: "🇳🇱" },
  { round: 16, name: "Italian Grand Prix", location: "Monza", country: "Italy", date: "5-7 Sep 2025", status: "completed", flag: "🇮🇹" },
  { round: 17, name: "Azerbaijan Grand Prix", location: "Baku", country: "Azerbaijan", date: "19-21 Sep 2025", status: "completed", flag: "🇦🇿" },
  { round: 18, name: "Singapore Grand Prix", location: "Marina Bay", country: "Singapore", date: "3-5 Okt 2025", status: "completed", flag: "🇸🇬" },
  { round: 19, name: "United States Grand Prix", location: "Austin", country: "USA", date: "17-19 Okt 2025", status: "completed", flag: "🇺🇸" },
  { round: 20, name: "Mexico City Grand Prix", location: "Mexico City", country: "Mexico", date: "24-26 Okt 2025", status: "completed", flag: "🇲🇽" },
  { round: 21, name: "São Paulo Grand Prix", location: "Interlagos", country: "Brazil", date: "7-9 Nov 2025", status: "completed", flag: "🇧🇷" },
  { round: 22, name: "Las Vegas Grand Prix", location: "Las Vegas", country: "USA", date: "21-23 Nov 2025", status: "upcoming", flag: "🇺🇸" },
  { round: 23, name: "Qatar Grand Prix", location: "Lusail", country: "Qatar", date: "28-30 Nov 2025", status: "upcoming", flag: "🇶🇦" },
  { round: 24, name: "Abu Dhabi Grand Prix", location: "Yas Marina", country: "United Arab Emirates", date: "5-7 Des 2025", status: "upcoming", flag: "🇦🇪" },
];

interface RaceCalendarProps {
  limit?: number;
  showViewMore?: boolean;
}

const RaceCalendar = ({ limit, showViewMore = false }: RaceCalendarProps) => {
  const navigate = useNavigate();
  const { data: meetings, isLoading } = useMeetings(2024);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const displayedRaces = limit ? meetings?.slice(0, limit) : meetings;

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
    <section ref={sectionRef} id="schedule" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">Race Calendar</span>
              <h2 className="text-4xl md:text-5xl font-bold">
                Kalender{" "}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Balapan
                </span>
              </h2>
            </div>
          </div>
          <p className="text-gray-400 text-lg max-w-xl ml-16">
            Jadwal lengkap Grand Prix dari OpenF1 API.
          </p>
        </div>

        {/* Race Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {isLoading ? (
            [...Array(limit || 4)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
            ))
          ) : (
            displayedRaces?.map((race, index) => {
              const isUpcoming = new Date(race.date_start) > new Date();
              return (
                <Card
                  key={race.meeting_key}
                  className={`group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer hover:scale-[1.02] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${isUpcoming ? 'border-red-500/30 hover:border-red-500/50' : ''}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onMouseEnter={(e) => {
                    if (isUpcoming) {
                      e.currentTarget.style.boxShadow = '0 25px 80px -20px rgba(239, 68, 68, 0.3)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 25px 80px -20px rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Upcoming Badge Glow */}
                  {isUpcoming && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-red-500/10 to-orange-500/5 pointer-events-none" />
                  )}

                  <div className="p-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Round Number */}
                        <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-all duration-300 group-hover:scale-110 ${
                          isUpcoming 
                            ? 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30' 
                            : 'bg-white/10 text-gray-300'
                        }`}>
                          {index + 1}
                          {isUpcoming && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-lg text-white leading-tight group-hover:text-red-400 transition-colors">
                            {race.meeting_name}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                            <MapPin className="h-3 w-3" />
                            {race.location}, {race.country_name}
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        isUpcoming
                          ? 'bg-gradient-to-r from-red-600/20 to-orange-600/20 text-red-400 border border-red-500/30'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {isUpcoming && <Zap className="w-3 h-3" />}
                        {isUpcoming ? 'Mendatang' : 'Selesai'}
                      </div>
                    </div>

                    {/* Date & Flag */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-400">{new Date(race.date_start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      {/* Using fallback flag since API might not always have it or use different format */}
                      <span className="text-3xl group-hover:scale-125 transition-transform">
                        {race.country_code === 'AUS' ? '🇦🇺' : 
                         race.country_code === 'CHN' ? '🇨🇳' : 
                         race.country_code === 'JPN' ? '🇯🇵' : 
                         race.country_code === 'BHR' ? '🇧🇭' : 
                         race.country_code === 'SAU' ? '🇸🇦' : 
                         race.country_code === 'USA' ? '🇺🇸' : 
                         race.country_code === 'ITA' ? '🇮🇹' : 
                         race.country_code === 'MON' ? '🇲🇨' : 
                         race.country_code === 'ESP' ? '🇪🇸' : 
                         race.country_code === 'CAN' ? '🇨🇦' : 
                         race.country_code === 'AUT' ? '🇦🇹' : 
                         race.country_code === 'GBR' ? '🇬🇧' : 
                         race.country_code === 'HUN' ? '🇭🇺' : 
                         race.country_code === 'BEL' ? '🇧🇪' : 
                         race.country_code === 'NLD' ? '🇳🇱' : '🏁'}
                      </span>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* View More Button */}
        {showViewMore && (
          <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => navigate("/schedule")}
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 hover:scale-105 h-14 px-10 overflow-hidden"
            >
              <span className="relative z-10">Lihat Jadwal Lengkap</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RaceCalendar;
