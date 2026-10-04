import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { seasonsQueryOptions } from "#/features/seasons/queries";

export const Route = createFileRoute("/seasons/")({
	component: SeasonsPage,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(seasonsQueryOptions()),
});

function SeasonsPage() {
	const { data } = useSuspenseQuery(seasonsQueryOptions());

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Seasons</h1>
			<div className="space-y-4">
				{data.championships.map((season) => (
					<div key={season.id} className="border p-4 rounded bg-gray-50">
						<h2 className="text-xl font-semibold">{season.name}</h2>
						<p className="text-sm text-gray-600">Year: {season.year}</p>
					</div>
				))}
			</div>
			<p className="text-sm text-gray-500 mt-6">
				Total: {data.total} championships
			</p>
		</div>
	);
}
