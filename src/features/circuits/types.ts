export type CircuitsApiResponse = {
	api: string;
	circuits: Array<{
		circuitId: string;
		circuitName: string;
		circuitLength: number;
		city: string;
		country: string;
		fastestLapDriverId: string | null;
		fastestLapTeamId: string | null;
		fastestLapYear: number | null;
		firstParticipationYear: number;
		lapRecord: string;
		numberOfCorners: number;
		url: string;
	}>;
	limit: number;
	offset: number;
	total: number;
	url: string;
};

export type Circuit = {
	id: string;
	name: string;
	length: number;
	city: string;
	country: string;
	corners: number;
	fastestLapDriverId: string | null;
	fastestLapTeamId: string | null;
	fastestLapYear: number | null;
	firstParticipationYear: number;
	lapRecord: string;
	url: string;
};

export type CircuitsData = {
	circuits: Circuit[];
	limit: number;
	offset: number;
	total: number;
};

export type CircuitDetailApiResponse = {
	api: string;
	circuit: Circuit;
	total: number;
	url: string;
};

export type CircuitDetail = Circuit;
