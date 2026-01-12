import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import openf1, {
    OpenF1Driver,
    OpenF1DriverChampionship,
    OpenF1TeamChampionship,
    OpenF1Meeting,
    OpenF1Session,
    OpenF1CarData,
    OpenF1Lap,
} from '@/lib/openf1';

// Cache time constants
const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 30 * 60 * 1000; // 30 minutes

// Drivers Hook
export function useDrivers(sessionKey?: number) {
    return useQuery({
        queryKey: ['drivers', sessionKey],
        queryFn: () => openf1.getDrivers(sessionKey),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!sessionKey,
    });
}

// Single Driver Hook
export function useDriver(driverNumber: number, sessionKey: number) {
    return useQuery({
        queryKey: ['driver', driverNumber, sessionKey],
        queryFn: () => openf1.getDriver(driverNumber, sessionKey),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!driverNumber && !!sessionKey,
    });
}

// Driver Championship Hook
export function useDriverChampionship(sessionKey?: number, driverNumbers?: number | number[]) {
    return useQuery({
        queryKey: ['championship_drivers', sessionKey, driverNumbers],
        queryFn: () => openf1.getDriverChampionship(sessionKey!, driverNumbers),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!sessionKey,
    });
}

// Team Championship Hook
export function useTeamChampionship(sessionKey?: number, teamName?: string) {
    return useQuery({
        queryKey: ['championship_teams', sessionKey, teamName],
        queryFn: () => openf1.getTeamChampionship(sessionKey!, teamName),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!sessionKey,
    });
}

// Meetings Hook
export function useMeetings(year?: number) {
    return useQuery({
        queryKey: ['meetings', year],
        queryFn: () => openf1.getMeetings(year),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

// Single Meeting Hook
export function useMeeting(meetingKey: number) {
    return useQuery({
        queryKey: ['meeting', meetingKey],
        queryFn: () => openf1.getMeeting(meetingKey),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
        enabled: !!meetingKey,
    });
}

// Sessions Hook
export function useSessions(meetingKey?: number, year?: number) {
    return useQuery({
        queryKey: ['sessions', meetingKey, year],
        queryFn: () => openf1.getSessions(meetingKey, year),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

// Latest Session Hook
export function useLatestSession() {
    return useQuery({
        queryKey: ['latest_session'],
        queryFn: () => openf1.getLatestSession(),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

// Car Data Hook
export function useCarData(
    driverNumber: number,
    sessionKey: number,
    options?: { speed?: number }
) {
    return useQuery({
        queryKey: ['car_data', driverNumber, sessionKey, options],
        queryFn: () => openf1.getCarData(driverNumber, sessionKey, options),
        staleTime: 60 * 1000, // 1 minute for live data
        gcTime: CACHE_TIME,
        enabled: !!driverNumber && !!sessionKey,
    });
}

// Laps Hook
export function useLaps(sessionKey: number, driverNumber?: number) {
    return useQuery({
        queryKey: ['laps', sessionKey, driverNumber],
        queryFn: () => openf1.getLaps(sessionKey, driverNumber),
        staleTime: 60 * 1000,
        gcTime: CACHE_TIME,
        enabled: !!sessionKey,
    });
}

// Combined Website Data Hook - Fetches all needed data
export function useWebsiteData(year: number = 2025) {
    return useQuery({
        queryKey: ['website_data', year],
        queryFn: () => openf1.getWebsiteData(year),
        staleTime: STALE_TIME,
        gcTime: CACHE_TIME,
    });
}

// Get Latest Race Session Key
export function useLatestRaceSession(year: number = 2025) {
    const { data: meetings } = useMeetings(year);

    // Get sessions for the last completed meeting
    const latestMeeting = meetings?.filter(m =>
        new Date(m.date_end) < new Date()
    ).pop();

    return useSessions(latestMeeting?.meeting_key, year);
}

// Useful combined hook for standings page
export function useStandings(year: number = 2025) {
    const sessionsQuery = useSessions(undefined, year);

    // Find latest race session
    const raceSession = sessionsQuery.data
        ?.filter(s => s.session_type === 'Race' && new Date(s.date_end) < new Date())
        .sort((a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime())[0];

    const driversQuery = useDrivers(raceSession?.session_key);
    const driverChampQuery = useDriverChampionship(raceSession?.session_key);
    const teamChampQuery = useTeamChampionship(raceSession?.session_key);

    // Combine driver info with championship standings
    const combinedDriverStandings = driverChampQuery.data?.map(standing => {
        const driverInfo = driversQuery.data?.find(
            d => d.driver_number === standing.driver_number
        );
        return {
            ...standing,
            ...driverInfo,
        };
    }).sort((a, b) => a.position_current - b.position_current);

    return {
        isLoading: sessionsQuery.isLoading || driversQuery.isLoading ||
            driverChampQuery.isLoading || teamChampQuery.isLoading,
        isError: sessionsQuery.isError || driversQuery.isError ||
            driverChampQuery.isError || teamChampQuery.isError,
        driverStandings: combinedDriverStandings,
        teamStandings: teamChampQuery.data?.sort((a, b) => a.position_current - b.position_current),
        sessionKey: raceSession?.session_key,
    };
}
