import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

const races = [
  { 
    round: 1, 
    name: "Bahrain Grand Prix", 
    location: "Sakhir", 
    country: "Bahrain",
    date: "2 Mar 2024",
    status: "completed"
  },
  { 
    round: 2, 
    name: "Saudi Arabian Grand Prix", 
    location: "Jeddah", 
    country: "Saudi Arabia",
    date: "9 Mar 2024",
    status: "completed"
  },
  { 
    round: 3, 
    name: "Australian Grand Prix", 
    location: "Melbourne", 
    country: "Australia",
    date: "24 Mar 2024",
    status: "completed"
  },
  { 
    round: 4, 
    name: "Japanese Grand Prix", 
    location: "Suzuka", 
    country: "Japan",
    date: "7 Apr 2024",
    status: "upcoming"
  },
  { 
    round: 5, 
    name: "Chinese Grand Prix", 
    location: "Shanghai", 
    country: "China",
    date: "21 Apr 2024",
    status: "upcoming"
  },
  { 
    round: 6, 
    name: "Miami Grand Prix", 
    location: "Miami", 
    country: "USA",
    date: "5 Mei 2024",
    status: "upcoming"
  },
];

const RaceCalendar = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
          {races.map((race) => (
            <Card 
              key={race.round}
              className={`group bg-card border-border transition-all duration-300 hover:shadow-lg ${
                race.status === 'upcoming' ? 'hover:border-primary/50' : ''
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary font-bold text-lg">
                      {race.round}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{race.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {race.location}, {race.country}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={race.status === 'completed' ? 'secondary' : 'default'}
                    className={race.status === 'upcoming' ? 'bg-primary/20 text-primary' : ''}
                  >
                    {race.status === 'completed' ? 'Selesai' : 'Mendatang'}
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
      </div>
    </section>
  );
};

export default RaceCalendar;
