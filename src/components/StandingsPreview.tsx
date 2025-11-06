import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";

const standings = [
  { position: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 575, change: 0 },
  { position: 2, name: "Charles Leclerc", team: "Ferrari", points: 307, change: 1 },
  { position: 3, name: "Carlos Sainz", team: "Ferrari", points: 244, change: -1 },
  { position: 4, name: "Lewis Hamilton", team: "Mercedes", points: 234, change: 0 },
  { position: 5, name: "Lando Norris", team: "McLaren", points: 205, change: 2 },
];

const StandingsPreview = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Klasemen <span className="text-primary">Pembalap</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Posisi terkini dalam kejuaraan dunia
          </p>
        </div>

        <Card className="bg-card border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-4 font-semibold">Pos</th>
                  <th className="text-left p-4 font-semibold">Pembalap</th>
                  <th className="text-left p-4 font-semibold">Tim</th>
                  <th className="text-right p-4 font-semibold">Poin</th>
                  <th className="text-center p-4 font-semibold">Tren</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((driver, index) => (
                  <tr 
                    key={driver.position}
                    className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${
                      index === 0 ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {driver.position === 1 && (
                          <Trophy className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-bold text-lg">{driver.position}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold">{driver.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-muted-foreground text-sm">{driver.team}</span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="font-bold text-xl text-primary">{driver.points}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        {driver.change === 0 ? (
                          <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                            -
                          </Badge>
                        ) : driver.change > 0 ? (
                          <Badge className="bg-green-500/20 text-green-500 w-8 h-8 rounded-full p-0 flex items-center justify-center">
                            +{driver.change}
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-500 w-8 h-8 rounded-full p-0 flex items-center justify-center">
                            {driver.change}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default StandingsPreview;
