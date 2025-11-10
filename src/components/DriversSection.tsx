import { Card } from "@/components/ui/card";
import { Trophy, Flag } from "lucide-react";

const drivers = [
  { name: "Lando Norris", number: "4", team: "McLaren", nationality: "Inggris", wins: 10, points: 1800 },
  { name: "Oscar Piastri", number: "81", team: "McLaren", nationality: "Australia", wins: 9, points: 700 },
  { name: "Max Verstappen", number: "1", team: "Red Bull Racing", nationality: "Belanda", wins: 65, points: 3200 },
  { name: "George Russell", number: "63", team: "Mercedes", nationality: "Inggris", wins: 5, points: 900 },
  { name: "Charles Leclerc", number: "16", team: "Ferrari", nationality: "Monaco", wins: 8, points: 1400 },
  { name: "Lewis Hamilton", number: "44", team: "Ferrari", nationality: "Inggris", wins: 105, points: 5010 },
  { name: "Kimi Antonelli", number: "12", team: "Mercedes", nationality: "Italia", wins: 0, points: 122 },
  { name: "Alexander Albon", number: "23", team: "Williams", nationality: "Thailand", wins: 0, points: 270 },
  { name: "Nico Hulkenberg", number: "27", team: "Kick Sauber", nationality: "Jerman", wins: 0, points: 550 },
  { name: "Isack Hadjar", number: "55", team: "Racing Bulls", nationality: "Prancis", wins: 0, points: 43 },
  { name: "Oliver Bearman", number: "87", team: "Haas F1 Team", nationality: "Inggris", wins: 0, points: 40 },
  { name: "Fernando Alonso", number: "14", team: "Aston Martin", nationality: "Spanyol", wins: 32, points: 2400 },
  { name: "Carlos Sainz", number: "55", team: "Williams", nationality: "Spanyol", wins: 4, points: 1300 },
  { name: "Liam Lawson", number: "30", team: "Racing Bulls", nationality: "Selandia Baru", wins: 0, points: 50 },
  { name: "Lance Stroll", number: "18", team: "Aston Martin", nationality: "Kanada", wins: 0, points: 300 },
  { name: "Esteban Ocon", number: "31", team: "Haas F1 Team", nationality: "Prancis", wins: 1, points: 450 },
  { name: "Yuki Tsunoda", number: "22", team: "Red Bull Racing", nationality: "Jepang", wins: 0, points: 170 },
  { name: "Pierre Gasly", number: "10", team: "Alpine", nationality: "Prancis", wins: 1, points: 440 },
  { name: "Gabriel Bortoleto", number: "5", team: "Kick Sauber", nationality: "Brasil", wins: 0, points: 19 },
  { name: "Franco Colapinto", number: "43", team: "Alpine", nationality: "Argentina", wins: 0, points: 5 }
]

interface DriversSectionProps {
  limit?: number;
  showViewMore?: boolean;
}

const DriversSection = ({ limit, showViewMore = false }: DriversSectionProps) => {
  const displayedDrivers = limit ? drivers.slice(0, limit) : drivers;
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pembalap <span className="text-primary">2025</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Statistik All time para driver formula 1 2025 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDrivers.map((driver) => (
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

        {showViewMore && (
          <div className="mt-12 text-center">
            <a 
              href="/drivers" 
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all h-11 px-8"
            >
              Lihat Selengkapnya
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default DriversSection;
