import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { teamDetailQueryOptions } from "#/features/teams/queries";

export const Route = createFileRoute("/teams/$teamId")({
	component: TeamDetailPage,
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(teamDetailQueryOptions(params.teamId)),
});

function TeamDetailPage() {
	const { teamId } = Route.useParams();
	const navigate = useNavigate();
	const { data } = useSuspenseQuery(teamDetailQueryOptions(teamId));

	return (
		<div className="p-8">
			<button
				type="button"
				onClick={() => navigate({ to: "/teams" })}
				className="mb-6 text-blue-600 hover:text-blue-800"
			>
				← Back to Teams
			</button>

			<h1 className="text-4xl font-bold mb-4">{data.name}</h1>

			<div className="bg-gray-50 p-6 rounded space-y-4">
				<div>
					<p className="font-semibold">Nationality</p>
					<p className="text-gray-600">{data.nationality}</p>
				</div>

				<div>
					<p className="font-semibold">Championships</p>
					<p className="text-gray-600">
						Constructors: {data.constructorsChampionships ?? "-"}
					</p>
					<p className="text-gray-600">
						Drivers: {data.driversChampionships ?? "-"}
					</p>
				</div>

				{data.firstAppearanceYear && (
					<div>
						<p className="font-semibold">First Appearance</p>
						<p className="text-gray-600">Year: {data.firstAppearanceYear}</p>
					</div>
				)}
			</div>
		</div>
	);
}
