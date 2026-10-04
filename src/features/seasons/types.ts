export type SeasonsResponse = {
	api: string;
	championships: Array<{
		championshipId: string;
		championshipName: string;
		url: string;
		year: number;
	}>;
	limit: number;
	offset: number;
	total: number;
	url: string;
};

export type Season = {
	id: string;
	name: string;
	year: number;
	url: string;
};

export type SeasonsData = {
	championships: Season[];
	limit: number;
	offset: number;
	total: number;
};
