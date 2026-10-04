import { apiGet } from "#/lib/api";
import type { SeasonsData, SeasonsResponse } from "./types";

export async function getSeasons(
	limit: number = 10,
	offset: number = 0,
): Promise<SeasonsData> {
	const response = await apiGet<SeasonsResponse>("/api/seasons", {
		limit,
		offset,
	});

	if ("status" in response) throw new Error(response.message);

	return {
		championships: response.championships.map((championship) => ({
			id: championship.championshipId,
			name: championship.championshipName,
			year: championship.year,
			url: championship.url,
		})),
		limit: response.limit,
		offset: response.offset,
		total: response.total,
	};
}
