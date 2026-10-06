import { apiGet } from "#/lib/api";
import type {
	Team,
	TeamDetailApiResponse,
	TeamsApiResponse,
	TeamsData,
} from "./types";

export async function getTeams(
	limit: number = 10,
	offset: number = 0,
): Promise<TeamsData> {
	const response = await apiGet<TeamsApiResponse>("/api/teams", {
		limit,
		offset,
	});

	if ("status" in response) throw new Error(response.message);

	return {
		teams: response.teams.map((team) => ({
			id: team.teamId,
			name: team.teamName,
			nationality: team.teamNationality,
			constructorsChampionships: team.constructorsChampionships,
			driversChampionships: team.driversChampionships,
			firstAppearanceYear: team.firstAppeareance,
			url: team.url,
		})),
		limit: response.limit,
		offset: response.offset,
		total: response.total,
	};
}

export async function getTeamDetail(teamId: string): Promise<Team> {
	const response = await apiGet<TeamDetailApiResponse>(`/api/teams/${teamId}`);

	if ("status" in response) throw new Error(response.message);

	const team = Array.isArray(response.team) ? response.team[0] : response.team;

	return {
		id: team.teamId,
		name: team.teamName,
		nationality: team.teamNationality,
		constructorsChampionships: team.constructorsChampionships,
		driversChampionships: team.driversChampionships,
		firstAppearanceYear: team.firstAppeareance,
		url: team.url,
	};
}
