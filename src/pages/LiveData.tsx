import { useState } from 'react';
import { useDrivers, useDriver, useMeetings, useSessions, useDriverChampionship, useTeamChampionship, useCarData } from '@/hooks/useOpenF1';
import { Card } from '@/components/ui/card';
import { Trophy, Users, Zap, Activity, Car, Timer, RefreshCw, ChevronRight, MapPin } from 'lucide-react';
import Footer from '@/components/Footer';

const LiveData = () => {
  const [selectedYear] = useState(2025);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);
  
  // Fetch meetings for the year
  const { data: meetings, isLoading: meetingsLoading, refetch: refetchMeetings } = useMeetings(selectedYear);
  
  // Get latest completed meeting
  const latestMeeting = meetings?.filter(m => 
    new Date(m.date_end) < new Date()
  ).sort((a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime())[0];

  // Get sessions for latest meeting
  const { data: sessions, isLoading: sessionsLoading } = useSessions(latestMeeting?.meeting_key);
  
  // Get latest race session
  const raceSession = sessions?.find(s => s.session_type === 'Race');

  // Fetch data using the session key
  const { data: drivers, isLoading: driversLoading } = useDrivers(raceSession?.session_key);
  const { data: driverChampionship, isLoading: champLoading } = useDriverChampionship(raceSession?.session_key);
  const { data: teamChampionship } = useTeamChampionship(raceSession?.session_key);

  // Fetch car data for selected driver
  const { data: carData, isLoading: carDataLoading } = useCarData(
    selectedDriverNumber || 0,
    raceSession?.session_key || 0,
    { speed: 300 }
  );

  const isLoading = meetingsLoading || sessionsLoading || driversLoading || champLoading;

  // Combine driver info with standings
  const combinedStandings = driverChampionship?.map(standing => {
    const driverInfo = drivers?.find(d => d.driver_number === standing.driver_number);
    return { ...standing, ...driverInfo };
  }).sort((a, b) => a.position_current - b.position_current);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-600/10 to-transparent rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-600/10 to-transparent rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-500 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    OpenF1 API Live Data
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Data <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">Real-Time</span>
                  </h1>
                </div>
              </div>
              <p className="text-gray-400 max-w-xl">
                Data langsung dari OpenF1 API - Klasemen terbaru, informasi pembalap, dan telemetri mobil.
              </p>
            </div>

            <button
              onClick={() => refetchMeetings()}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>

          {/* Current Event Info */}
          {latestMeeting && (
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6 mb-8">
              <div className="flex items-center gap-4">
                {latestMeeting.circuit_image && (
                  <img src={latestMeeting.circuit_image} alt={latestMeeting.circuit_short_name} className="w-20 h-20 object-contain" />
                )}
                <div>
                  <p className="text-gray-400 text-sm">Balapan Terakhir</p>
                  <h2 className="text-2xl font-bold text-white">{latestMeeting.meeting_name}</h2>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    {latestMeeting.location}, {latestMeeting.country_name}
                  </div>
                </div>
                {latestMeeting.country_flag && (
                  <img src={latestMeeting.country_flag} alt={latestMeeting.country_name} className="w-16 h-10 object-cover rounded ml-auto" />
                )}
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pemimpin Klasemen</p>
                  <p className="text-xl font-bold text-white">
                    {combinedStandings?.[0]?.full_name || 'Loading...'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tim Teratas</p>
                  <p className="text-xl font-bold text-white">
                    {teamChampionship?.sort((a, b) => a.position_current - b.position_current)[0]?.team_name || 'Loading...'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Pembalap</p>
                  <p className="text-xl font-bold text-white">{drivers?.length || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Balapan ke-</p>
                  <p className="text-xl font-bold text-white">
                    {meetings?.filter(m => new Date(m.date_end) < new Date()).length || 0} / {meetings?.length || 0}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Driver Standings from API */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Klasemen Pembalap <span className="text-green-500 text-sm font-normal">(Live API)</span>
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="bg-white/5 border-white/10 p-6 animate-pulse">
                  <div className="h-20 bg-white/10 rounded-lg" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {combinedStandings?.slice(0, 8).map((driver, index) => (
                <Card
                  key={driver.driver_number}
                  className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-6 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ borderColor: driver.team_colour ? `#${driver.team_colour}30` : undefined }}
                  onClick={() => setSelectedDriverNumber(driver.driver_number)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                      index === 2 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' :
                      'bg-white/10 text-gray-400'
                    }`}>
                      {driver.position_current}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white group-hover:text-red-400 transition-colors">
                        {driver.full_name || `Driver #${driver.driver_number}`}
                      </p>
                      <p className="text-sm" style={{ color: driver.team_colour ? `#${driver.team_colour}` : '#888' }}>
                        {driver.team_name || 'Unknown Team'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl font-bold text-red-500">{driver.points_current}</span>
                        <span className="text-xs text-gray-500">pts</span>
                        {driver.points_current > driver.points_start && (
                          <span className="text-xs text-green-500">+{driver.points_current - driver.points_start}</span>
                        )}
                      </div>
                    </div>
                    {driver.headshot_url && (
                      <img 
                        src={driver.headshot_url} 
                        alt={driver.full_name} 
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform"
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Car Data Section */}
      {selectedDriverNumber && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyan-500" />
              Telemetri Mobil - Driver #{selectedDriverNumber}
            </h2>

            {carDataLoading ? (
              <Card className="bg-white/5 border-white/10 p-8">
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Loading telemetry data...
                </div>
              </Card>
            ) : carData && carData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {carData.slice(0, 4).map((data, i) => (
                  <Card key={i} className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
                    <p className="text-gray-400 text-sm mb-2">Data Point #{i + 1}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Speed</span>
                        <span className="font-bold text-cyan-400">{data.speed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">RPM</span>
                        <span className="font-bold text-orange-400">{data.rpm?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Gear</span>
                        <span className="font-bold text-purple-400">{data.n_gear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Throttle</span>
                        <span className="font-bold text-green-400">{data.throttle}%</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/5 border-white/10 p-8 text-center text-gray-400">
                No high-speed data available for this driver in this session.
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Team Standings */}
      <section className="py-12 px-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            Klasemen Tim <span className="text-green-500 text-sm font-normal">(Live API)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamChampionship?.sort((a, b) => a.position_current - b.position_current).map((team, index) => (
              <Card
                key={team.team_name}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 p-6 transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500 to-amber-600 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800' :
                    index === 2 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    {team.position_current}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
                      {team.team_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-bold text-blue-500">{team.points_current}</span>
                      <span className="text-sm text-gray-500">points</span>
                      {team.points_current > team.points_start && (
                        <span className="text-sm text-green-500 ml-2">+{team.points_current - team.points_start}</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specific Data Insights (Requested APIs) */}
      <section className="py-12 px-4 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-emerald-500" />
            Wawasan Data Spesifik <span className="text-green-500 text-sm font-normal">(Requested Insights)</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* API 1: Specific Driver Info */}
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Driver Legend (Session 9158)</h3>
              <SpecificDriverInfo />
            </Card>

            {/* API 2: Specific Team Standings */}
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">McLaren Performance (9839)</h3>
              <McLarenPerformance />
            </Card>

            {/* API 3: Multiple Driver Standings */}
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">McLaren Duo (9839)</h3>
              <McLarenDuo />
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- Sub-components for specific API highlights ---

const SpecificDriverInfo = () => {
    const { data: driverInfo, isLoading } = useDriver(1, 9158);
    const driver = driverInfo?.[0];

    if (isLoading) return <div className="animate-pulse h-20 bg-white/5 rounded-lg" />;
    if (!driver) return <div className="text-gray-500 text-sm">No data found</div>;

    return (
        <div className="flex items-center gap-4">
            <img src={driver.headshot_url} alt={driver.full_name} className="w-12 h-12 rounded-full border border-white/10" />
            <div>
                <p className="font-bold text-white">{driver.full_name}</p>
                <p className="text-sm text-gray-500">{driver.team_name} | #{driver.driver_number}</p>
            </div>
        </div>
    );
};

const McLarenPerformance = () => {
    const { data: teamStanding, isLoading } = useTeamChampionship(9839, 'McLaren');
    const standing = teamStanding?.[0];

    if (isLoading) return <div className="animate-pulse h-20 bg-white/5 rounded-lg" />;
    if (!standing) return <div className="text-gray-500 text-sm">No data found</div>;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">{standing.team_name}</span>
                <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-gray-400">P{standing.position_current}</span>
            </div>
            <p className="text-4xl font-black text-[#FF8000]">{standing.points_current} pts</p>
            <p className="text-xs text-gray-500 italic mt-2">Current Position in Session 9839</p>
        </div>
    );
};

const McLarenDuo = () => {
    const { data: driverStandings, isLoading } = useDriverChampionship(9839, [4, 81]);

    if (isLoading) return <div className="animate-pulse h-24 bg-white/5 rounded-lg" />;
    if (!driverStandings || driverStandings.length === 0) return <div className="text-gray-500 text-sm">No data found</div>;

    return (
        <div className="space-y-4">
            {driverStandings.map(d => (
                <div key={d.driver_number} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-white font-medium">Driver {d.driver_number === 4 ? 'Lando' : 'Oscar'}</span>
                    <div className="text-right">
                        <span className="text-red-500 font-bold">{d.points_current} pts</span>
                        <p className="text-[10px] text-gray-500">Position P{d.position_current}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LiveData;
