import { Card } from "@/components/ui/card";
import { Trophy, Flag } from "lucide-react";

const drivers = [
  { name: "Max Verstappen", number: "1", team: "Red Bull Racing", nationality: "Belanda", wins: 19, points: 575 },
  { name: "Lewis Hamilton", number: "44", team: "Mercedes", nationality: "Inggris", wins: 2, points: 234 },
  { name: "Charles Leclerc", number: "16", team: "Ferrari", nationality: "Monaco", wins: 5, points: 307 },
  { name: "Lando Norris", number: "4", team: "McLaren", nationality: "Inggris", wins: 1, points: 205 },
  { name: "Fernando Alonso", number: "14", team: "Aston Martin", nationality: "Spanyol", wins: 0, points: 183 },
  { name: "Carlos Sainz", number: "55", team: "Ferrari", nationality: "Spanyol", wins: 3, points: 244 },
];

const DriversSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pembalap <span className="text-primary">2024</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Para gladiator tercepat di sirkuit Formula 1
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <Card 
              key={driver.number}
              className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_100%_44%/0.2)] cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-6xl font-bold text-primary/20 mb-2">
                      {driver.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{driver.name}</h3>
                    <p className="text-sm text-muted-foreground">{driver.team}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{driver.wins} Wins</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">{driver.points} Poin</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  🏁 {driver.nationality}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriversSection;
