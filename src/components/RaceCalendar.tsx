import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const races = [
  {
    round: 1,
    name: "Australian Grand Prix",
    location: "Melbourne",
    country: "Australia",
    date: "14-16 Mar 2025",
    status: "completed",
  },
  {
    round: 2,
    name: "Chinese Grand Prix",
    location: "Shanghai",
    country: "China",
    date: "21-23 Mar 2025",
    status: "completed",
  },
  {
    round: 3,
    name: "Japanese Grand Prix",
    location: "Suzuka",
    country: "Japan",
    date: "4-6 Apr 2025",
    status: "completed",
  },
  {
    round: 4,
    name: "Bahrain Grand Prix",
    location: "Sakhir",
    country: "Bahrain",
    date: "11-13 Apr 2025",
    status: "completed",
  },
  {
    round: 5,
    name: "Saudi Arabian Grand Prix",
    location: "Jeddah",
    country: "Saudi Arabia",
    date: "18-20 Apr 2025",
    status: "completed",
  },
  {
    round: 6,
    name: "Miami Grand Prix",
    location: "Miami",
    country: "USA",
    date: "2-4 Mei 2025",
    status: "completed",
  },
  {
    round: 7,
    name: "Emilia Romagna Grand Prix",
    location: "Imola",
    country: "Italy",
    date: "9-11 Mei 2025",
    status: "completed",
  },
  {
    round: 8,
    name: "Monaco Grand Prix",
    location: "Monte Carlo",
    country: "Monaco",
    date: "23-25 Mei 2025",
    status: "completed",
  },
  {
    round: 9,
    name: "Spanish Grand Prix",
    location: "Barcelona",
    country: "Spain",
    date: "6-8 Jun 2025",
    status: "completed",
  },
  {
    round: 10,
    name: "Canadian Grand Prix",
    location: "Montreal",
    country: "Canada",
    date: "13-15 Jun 2025",
    status: "completed",
  },
  {
    round: 11,
    name: "Austrian Grand Prix",
    location: "Spielberg",
    country: "Austria",
    date: "27-29 Jun 2025",
    status: "completed",
  },
  {
    round: 12,
    name: "British Grand Prix",
    location: "Silverstone",
    country: "United Kingdom",
    date: "4-6 Jul 2025",
    status: "completed",
  },
  {
    round: 13,
    name: "Hungarian Grand Prix",
    location: "Budapest",
    country: "Hungary",
    date: "18-20 Jul 2025",
    status: "completed",
  },
  {
    round: 14,
    name: "Belgian Grand Prix",
    location: "Spa-Francorchamps",
    country: "Belgium",
    date: "25-27 Jul 2025",
    status: "completed",
  },
  {
    round: 15,
    name: "Dutch Grand Prix",
    location: "Zandvoort",
    country: "Netherlands",
    date: "1-3 Aug 2025",
    status: "completed",
  },
  {
    round: 16,
    name: "Italian Grand Prix",
    location: "Monza",
    country: "Italy",
    date: "5-7 Sep 2025",
    status: "completed",
  },
  {
    round: 17,
    name: "Azerbaijan Grand Prix",
    location: "Baku",
    country: "Azerbaijan",
    date: "19-21 Sep 2025",
    status: "completed",
  },
  {
    round: 18,
    name: "Singapore Grand Prix",
    location: "Marina Bay",
    country: "Singapore",
    date: "3-5 Okt 2025",
    status: "completed",
  },
  {
    round: 19,
    name: "United States Grand Prix",
    location: "Austin",
    country: "USA",
    date: "17-19 Okt 2025",
    status: "completed",
  },
  {
    round: 20,
    name: "Mexico City Grand Prix",
    location: "Mexico City",
    country: "Mexico",
    date: "24-26 Okt 2025",
    status: "completed",
  },
  {
    round: 21,
    name: "São Paulo Grand Prix",
    location: "Interlagos",
    country: "Brazil",
    date: "7-9 Nov 2025",
    status: "completed",
  },
  {
    round: 22,
    name: "Las Vegas Grand Prix",
    location: "Las Vegas",
    country: "USA",
    date: "21-23 Nov 2025",
    status: "upcoming",
  },
  {
    round: 23,
    name: "Qatar Grand Prix",
    location: "Lusail",
    country: "Qatar",
    date: "28-30 Nov 2025",
    status: "upcoming",
  },
  {
    round: 24,
    name: "Abu Dhabi Grand Prix",
    location: "Yas Marina",
    country: "United Arab Emirates",
    date: "5-7 Des 2025",
    status: "upcoming",
  },
];

interface RaceCalendarProps {
  limit?: number;
  showViewMore?: boolean;
}

const RaceCalendar = ({ limit, showViewMore = false }: RaceCalendarProps) => {
  const navigate = useNavigate();
  const displayedRaces = limit ? races.slice(0, limit) : races;

  return (
    <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Kalender <span className="text-primary">Balapan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Jadwal lengkap Grand Prix musim 2024
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedRaces.map((race) => (
            <Card
              key={race.round}
              className={`group bg-card border-border transition-all duration-300 hover:shadow-lg ${
                race.status === "upcoming" ? "hover:border-primary/50" : ""
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                      {race.round}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">
                        {race.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {race.location}, {race.country}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      race.status === "completed" ? "secondary" : "default"
                    }
                    className={
                      race.status === "upcoming"
                        ? "bg-primary/20 text-primary"
                        : ""
                    }
                  >
                    {race.status === "completed" ? "Selesai" : "Mendatang"}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                  <Calendar className="h-4 w-4" />
                  <span>{race.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {showViewMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate("/schedule")}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all h-11 px-8"
            >
              Lihat Selengkapnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RaceCalendar;
