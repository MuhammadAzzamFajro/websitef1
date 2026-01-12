// OpenF1 API Client
// Documentation: https://openf1.org

const BASE_URL = 'https://api.openf1.org/v1';

// Types based on OpenF1 API responses
export interface OpenF1Driver {
    broadcast_name: string;
    country_code: string;
    driver_number: number;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    meeting_key: number;
    name_acronym: string;
    session_key: number;
    team_colour: string;
    team_name: string;
}

export interface OpenF1DriverChampionship {
    driver_number: number;
    meeting_key: number;
    points_current: number;
    points_start: number;
    position_current: number;
    position_start: number;
    session_key: number;
}

export interface OpenF1TeamChampionship {
    meeting_key: number;
    points_current: number;
    points_start: number;
    position_current: number;
    position_start: number;
    session_key: number;
    team_name: string;
}

export interface OpenF1Meeting {
    circuit_key: number;
    circuit_image: string;
    circuit_short_name: string;
    circuit_type: string;
    country_code: string;
    country_flag: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    meeting_name: string;
    meeting_official_name: string;
    year: number;
}

export interface OpenF1Session {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_end: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    session_key: number;
    session_name: string;
    session_type: string;
    year: number;
}

export interface OpenF1CarData {
    brake: number;
    date: string;
    driver_number: number;
    drs: number;
    meeting_key: number;
    n_gear: number;
    rpm: number;
    session_key: number;
    speed: number;
    throttle: number;
}

export interface OpenF1Position {
    date: string;
    driver_number: number;
    meeting_key: number;
    position: number;
    session_key: number;
}

export interface OpenF1Lap {
    date_start: string;
    driver_number: number;
    duration_sector_1: number;
    duration_sector_2: number;
    duration_sector_3: number;
    i1_speed: number;
    i2_speed: number;
    is_pit_out_lap: boolean;
    lap_duration: number;
    lap_number: number;
    meeting_key: number;
    segments_sector_1: number[];
    segments_sector_2: number[];
    segments_sector_3: number[];
    session_key: number;
    st_speed: number;
}

// API Functions
async function fetchAPI<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`OpenF1 API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Drivers
export async function getDrivers(sessionKey?: number): Promise<OpenF1Driver[]> {
    const params: Record<string, string | number> = {};
    if (sessionKey) params.session_key = sessionKey;
    return fetchAPI<OpenF1Driver[]>('/drivers', params);
}

export async function getDriver(driverNumber: number, sessionKey: number): Promise<OpenF1Driver[]> {
    return fetchAPI<OpenF1Driver[]>('/drivers', { driver_number: driverNumber, session_key: sessionKey });
}

// Championship Standings
export async function getDriverChampionship(
    sessionKey: number,
    driverNumbers?: number | number[]
): Promise<OpenF1DriverChampionship[]> {
    const params: Record<string, string | number> = { session_key: sessionKey };

    // Handle specific driver numbers
    if (driverNumbers !== undefined) {
        const url = new URL(`${BASE_URL}/championship_drivers`);
        url.searchParams.append('session_key', String(sessionKey));

        if (Array.isArray(driverNumbers)) {
            driverNumbers.forEach(num => url.searchParams.append('driver_number', String(num)));
        } else {
            url.searchParams.append('driver_number', String(driverNumbers));
        }

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`OpenF1 API Error: ${response.status}`);
        return response.json();
    }

    return fetchAPI<OpenF1DriverChampionship[]>('/championship_drivers', params);
}

export async function getTeamChampionship(
    sessionKey: number,
    teamName?: string
): Promise<OpenF1TeamChampionship[]> {
    const params: Record<string, string | number> = { session_key: sessionKey };
    if (teamName) params.team_name = teamName;
    return fetchAPI<OpenF1TeamChampionship[]>('/championship_teams', params);
}

// Meetings (Races)
export async function getMeetings(year?: number): Promise<OpenF1Meeting[]> {
    const params: Record<string, string | number> = {};
    if (year) params.year = year;
    return fetchAPI<OpenF1Meeting[]>('/meetings', params);
}

export async function getMeeting(meetingKey: number): Promise<OpenF1Meeting[]> {
    return fetchAPI<OpenF1Meeting[]>('/meetings', { meeting_key: meetingKey });
}

// Sessions
export async function getSessions(meetingKey?: number, year?: number): Promise<OpenF1Session[]> {
    const params: Record<string, string | number> = {};
    if (meetingKey) params.meeting_key = meetingKey;
    if (year) params.year = year;
    return fetchAPI<OpenF1Session[]>('/sessions', params);
}

export async function getLatestSession(): Promise<OpenF1Session[]> {
    // Get sessions for current year and find the latest race
    const currentYear = new Date().getFullYear();
    const sessions = await getSessions(undefined, currentYear);

    // Filter for race sessions and sort by date
    const raceSessions = sessions
        .filter(s => s.session_type === 'Race')
        .sort((a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime());

    return raceSessions.slice(0, 1);
}

// Car Data
export async function getCarData(
    driverNumber: number,
    sessionKey: number,
    options?: { speed?: number }
): Promise<OpenF1CarData[]> {
    const params: Record<string, string | number> = {
        driver_number: driverNumber,
        session_key: sessionKey,
    };

    // Note: For speed filtering, the API uses speed>= format
    // This is handled through direct URL manipulation
    let url = `${BASE_URL}/car_data?driver_number=${driverNumber}&session_key=${sessionKey}`;
    if (options?.speed) {
        url += `&speed>=${options.speed}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`OpenF1 API Error: ${response.status}`);
    }
    return response.json();
}

// Positions
export async function getPositions(sessionKey: number): Promise<OpenF1Position[]> {
    return fetchAPI<OpenF1Position[]>('/position', { session_key: sessionKey });
}

// Laps
export async function getLaps(sessionKey: number, driverNumber?: number): Promise<OpenF1Lap[]> {
    const params: Record<string, string | number> = { session_key: sessionKey };
    if (driverNumber) params.driver_number = driverNumber;
    return fetchAPI<OpenF1Lap[]>('/laps', params);
}

// Helper: Get all data needed for the website
export async function getWebsiteData(year: number = 2025) {
    try {
        // Get all meetings for the year
        const meetings = await getMeetings(year);

        // Get sessions for latest meeting
        const latestMeeting = meetings[meetings.length - 1];
        const sessions = latestMeeting ? await getSessions(latestMeeting.meeting_key) : [];

        // Get latest race session
        const raceSession = sessions.find(s => s.session_type === 'Race');

        let drivers: OpenF1Driver[] = [];
        let driverStandings: OpenF1DriverChampionship[] = [];
        let teamStandings: OpenF1TeamChampionship[] = [];

        if (raceSession) {
            drivers = await getDrivers(raceSession.session_key);
            driverStandings = await getDriverChampionship(raceSession.session_key);
            teamStandings = await getTeamChampionship(raceSession.session_key);
        }

        return {
            meetings,
            sessions,
            drivers,
            driverStandings,
            teamStandings,
            latestSessionKey: raceSession?.session_key,
        };
    } catch (error) {
        console.error('Error fetching website data:', error);
        throw error;
    }
}

export default {
    getDrivers,
    getDriver,
    getDriverChampionship,
    getTeamChampionship,
    getMeetings,
    getMeeting,
    getSessions,
    getLatestSession,
    getCarData,
    getPositions,
    getLaps,
    getWebsiteData,
};
