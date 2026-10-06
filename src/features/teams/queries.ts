import { queryOptions } from "@tanstack/react-query";
import { getTeamDetail, getTeams } from "./api";

export const teamKeys = {
	all: ["teams"] as const,
	lists: () => [...teamKeys.all, "list"] as const,
	list: (limit: number, offset: number) =>
		[...teamKeys.lists(), { limit, offset }] as const,
};

export function teamsQueryOptions(limit: number = 100, offset: number = 0) {
	return queryOptions({
		queryKey: teamKeys.list(limit, offset),
		queryFn: () => getTeams(limit, offset),
		staleTime: 1000 * 60 * 10,
	});
}

export function teamDetailQueryOptions(teamId: string) {
	return queryOptions({
		queryKey: [...teamKeys.all, "detail", teamId] as const,
		queryFn: () => getTeamDetail(teamId),
		staleTime: 1000 * 60 * 10,
	});
}
