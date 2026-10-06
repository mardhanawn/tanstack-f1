import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { teamsQueryOptions } from "#/features/teams/queries";

export const Route = createFileRoute("/teams/")({
	component: TeamsPage,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(teamsQueryOptions()),
});

function TeamsPage() {
	const navigate = useNavigate();
	const { data } = useSuspenseQuery(teamsQueryOptions());

	console.log("data Teams page", DataTransfer);

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Teams</h1>
			<div className="space-y-4">
				{data.teams.map((team) => (
					<button
						key={team.id}
						type="button"
						onClick={() => navigate({ to: `/teams/${team.id}` })}
						className="w-full text-left border p-4 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
					>
						<h2 className="text-xl font-semibold">{team.name}</h2>
						<p className="text-sm text-gray-600">
							Nationality: {team.nationality}
						</p>
						<p className="text-sm text-gray-600">
							Constructors Championships:{" "}
							{team.constructorsChampionships ?? "-"}
						</p>
						<p className="text-sm text-gray-600">
							Drivers Championships: {team.driversChampionships ?? "-"}
						</p>
						{team.firstAppearanceYear && (
							<p className="text-sm text-gray-600 mt-2">
								First Appearance: {team.firstAppearanceYear}
							</p>
						)}
					</button>
				))}
			</div>
			<p className="text-sm text-gray-500 mt-6">Total: {data.total} teams</p>
		</div>
	);
}
