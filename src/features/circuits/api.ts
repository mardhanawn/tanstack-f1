import { apiGet } from "#/lib/api";
import type {
	Circuit,
	CircuitDetailApiResponse,
	CircuitsApiResponse,
	CircuitsData,
} from "./types";

export async function getCircuits(
	limit: number = 10,
	offset: number = 0,
): Promise<CircuitsData> {
	const response = await apiGet<CircuitsApiResponse>("/api/circuits", {
		limit,
		offset,
	});

	if ("status" in response) throw new Error(response.message);

	return {
		circuits: response.circuits.map((circuit) => ({
			id: circuit.circuitId,
			name: circuit.circuitName,
			length: circuit.circuitLength,
			city: circuit.city,
			country: circuit.country,
			corners: circuit.numberOfCorners,
			fastestLapDriverId: circuit.fastestLapDriverId,
			fastestLapTeamId: circuit.fastestLapTeamId,
			fastestLapYear: circuit.fastestLapYear,
			firstParticipationYear: circuit.firstParticipationYear,
			lapRecord: circuit.lapRecord,
			url: circuit.url,
		})),
		limit: response.limit,
		offset: response.offset,
		total: response.total,
	};
}

export async function getCircuitDetail(circuitId: string): Promise<Circuit> {
	const response = await apiGet<CircuitDetailApiResponse>(
		`/api/circuits/${circuitId}`,
	);

	if ("status" in response) throw new Error(response.message);

	const circuit = Array.isArray(response.circuit)
		? response.circuit[0]
		: response.circuit;

	return {
		id: circuit.circuitId,
		name: circuit.circuitName,
		length: circuit.circuitLength,
		city: circuit.city,
		country: circuit.country,
		corners: circuit.numberOfCorners,
		fastestLapDriverId: circuit.fastestLapDriverId,
		fastestLapTeamId: circuit.fastestLapTeamId,
		fastestLapYear: circuit.fastestLapYear,
		firstParticipationYear: circuit.firstParticipationYear,
		lapRecord: circuit.lapRecord,
		url: circuit.url,
	};
}
