import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const standings = [
  { position: 1, name: "Lando Norris",        team: "McLaren",         points: 390, nationality: "Inggris" },
  { position: 2, name: "Oscar Piastri",       team: "Mclaren",         points: 366, nationality: "Australia" },
  { position: 3, name: "Max Verstappen",      team: "Red Bull Racing", points: 341, nationality: "Belanda" },
  { position: 4, name: "George Russel",       team: "Mercedes",        points: 276, nationality: "Inggris" },
  { position: 5, name: "Charles Leclerc",     team: "Ferrari",         points: 214, nationality: "Monaco" },
  { position: 6,  name: "Lewis Hamilton",     team: "Ferrari",         points: 148, nationality: "Inggris" },
  { position: 7,  name: "Kimi Antonelli",     team: "Mercedes",        points: 122, nationality: "Italia" },
  { position: 8,  name: "Alexander Albon",    team: "Williams",        points: 73,  nationality: "Thailand" },
  { position: 9,  name: "Nico Hülkenberg",    team: "Sauber",          points: 43,  nationality: "Jerman" },
  { position:10,  name: "Isack Hadjar",       team: "Racing Bulls",    points: 43,  nationality: "Prancis" },
  { position:11,  name: "Oliver Bearman",     team: "Haas",            points: 40,  nationality: "Inggris" },
  { position:12,  name: "Fernando Alonso",    team: "Aston Martin",    points: 40,  nationality: "Spanyol" },
  { position:13,  name: "Carlos Sainz",       team: "Williams",        points: 38,  nationality: "Spanyol" },
  { position:14,  name: "Liam Lawson",        team: "Racing Bulls",    points: 36,  nationality: "New Zealand" },
  { position:15,  name: "Lance Stroll",       team: "Aston Martin",    points: 32,  nationality: "Kanada" },
  { position:16,  name: "Esteban Ocon",       team: "Haas",            points: 30,  nationality: "Prancis" },
  { position:17,  name: "Yuki Tsunoda",       team: "Red Bull Racing", points: 28,  nationality: "Jepang" },
  { position:18,  name: "Pierre Gasly",       team: "Alpine",          points: 22,  nationality: "Prancis" },
  { position:19,  name: "Gabriel Bortoleto",  team: "Sauber",          points: 19,  nationality: "Brasil" },
  { position:20,  name: "Franco Colapinto",   team: "Alpine",          points: 0,   nationality: "Argentina" }
];

interface StandingsPreviewProps {
  limit?: number;
  showViewMore?: boolean;
}

const StandingsPreview = ({ limit, showViewMore = false }: StandingsPreviewProps) => {
  const navigate = useNavigate()
  const displayedStandings = limit ? standings.slice(0, limit) : standings;

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
                {displayedStandings.map((driver, index) => (
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
                        <span className="text-sm font-medium">{driver.nationality}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {showViewMore && (
      <Button onClick={() => navigate("/standings")}>
        Lihat Selengkapnya
      </Button>
    )}
      </div>
    </section>
  );
};

export default StandingsPreview;
