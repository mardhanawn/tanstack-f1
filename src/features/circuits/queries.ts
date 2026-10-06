import { queryOptions } from "@tanstack/react-query";
import { getCircuitDetail, getCircuits } from "./api";

export const circuitKeys = {
	all: ["circuits"] as const,
	lists: () => [...circuitKeys.all, "list"] as const,
	list: (limit: number, offset: number) =>
		[...circuitKeys.lists(), { limit, offset }] as const,
};

export function circuitsQueryOptions(limit: number = 10, offset: number = 0) {
	return queryOptions({
		queryKey: circuitKeys.list(limit, offset),
		queryFn: () => getCircuits(limit, offset),
		staleTime: 1000 * 60 * 10,
	});
}

export function circuitDetailQueryOptions(circuitId: string) {
	return queryOptions({
		queryKey: [...circuitKeys.all, "detail", circuitId] as const,
		queryFn: () => getCircuitDetail(circuitId),
		staleTime: 1000 * 60 * 10,
	});
}
