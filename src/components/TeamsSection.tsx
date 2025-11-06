import { Card } from "@/components/ui/card";
import { Users, Award } from "lucide-react";

const teams = [
  { 
    name: "Red Bull Racing", 
    base: "Milton Keynes, UK", 
    teamPrincipal: "Christian Horner",
    championships: 6,
    points: 860,
    drivers: ["Max Verstappen", "Sergio Pérez"]
  },
  { 
    name: "Mercedes", 
    base: "Brackley, UK", 
    teamPrincipal: "Toto Wolff",
    championships: 8,
    points: 409,
    drivers: ["Lewis Hamilton", "George Russell"]
  },
  { 
    name: "Ferrari", 
    base: "Maranello, Italia", 
    teamPrincipal: "Frédéric Vasseur",
    championships: 16,
    points: 551,
    drivers: ["Charles Leclerc", "Carlos Sainz"]
  },
  { 
    name: "McLaren", 
    base: "Woking, UK", 
    teamPrincipal: "Andrea Stella",
    championships: 8,
    points: 438,
    drivers: ["Lando Norris", "Oscar Piastri"]
  },
];

const TeamsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tim <span className="text-primary">Konstruktor</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Raksasa teknologi di balik mesin balap tercepat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <Card 
              key={team.name}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_100%_44%/0.2)]"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">📍 {team.base}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold">{team.championships}x</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Team Principal</p>
                    <p className="font-semibold">{team.teamPrincipal}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      Pembalap
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {team.drivers.map((driver) => (
                        <span 
                          key={driver}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {driver}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Poin</span>
                      <span className="text-2xl font-bold text-primary">{team.points}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
