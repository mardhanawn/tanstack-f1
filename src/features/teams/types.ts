export type TeamsApiResponse = {
	api: string;
	teams: Array<{
		teamId: string;
		teamName: string;
		teamNationality: string;
		constructorsChampionships: number | null;
		driversChampionships: number | null;
		firstAppeareance: number | null;
		url: string;
	}>;
	limit: number;
	offset: number;
	total: number;
	url: string;
};

export type Team = {
    id: string;
    name: string;
    nationality: string;
    constructorsChampionships: number | null;
    driversChampionships: number | null;
    firstAppearanceYear: number | null;
    url: string;
};

export type TeamsData = {
	teams: Team[];
	limit: number;
	offset: number;
	total: number;
};

export type TeamDetailApiResponse = {
	api: string;
	team: Team;
	total: number;
	url: string;
};

export type TeamDetail = Team;
