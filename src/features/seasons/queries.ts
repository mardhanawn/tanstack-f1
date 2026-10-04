import { queryOptions } from "@tanstack/react-query";
import { getSeasons } from "./api";

export const seasonKeys = {
	all: ["seasons"] as const,
	lists: () => [...seasonKeys.all, "list"] as const,
	list: (limit: number, offset: number) =>
		[...seasonKeys.lists(), { limit, offset }] as const,
};

export function seasonsQueryOptions(limit: number = 10, offset: number = 0) {
	return queryOptions({
		queryKey: seasonKeys.list(limit, offset),
		queryFn: () => getSeasons(limit, offset),
		staleTime: 1000 * 60 * 10,
	});
}
