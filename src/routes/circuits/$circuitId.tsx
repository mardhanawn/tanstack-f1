import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { circuitDetailQueryOptions } from "#/features/circuits/queries";
import { formatId } from "#/lib/utils";

export const Route = createFileRoute("/circuits/$circuitId")({
	component: CircuitDetailPage,
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(
			circuitDetailQueryOptions(params.circuitId),
		),
});

function CircuitDetailPage() {
	const { circuitId } = Route.useParams();
	const navigate = useNavigate();
	const { data } = useSuspenseQuery(circuitDetailQueryOptions(circuitId));

	return (
		<div className="p-8">
			<button
				type="button"
				onClick={() => navigate({ to: "/circuits" })}
				className="mb-6 text-blue-600 hover:text-blue-800"
			>
				← Back to Circuits
			</button>

			<h1 className="text-4xl font-bold mb-4">{data.name}</h1>

			<div className="bg-gray-50 p-6 rounded space-y-4">
				<div>
					<p className="font-semibold">Location</p>
					<p className="text-gray-600">
						{data.city}, {data.country}
					</p>
				</div>

				<div>
					<p className="font-semibold">Track Details</p>
					<p className="text-gray-600">Length: {data.length}m</p>
					<p className="text-gray-600">Corners: {data.corners}</p>
				</div>

				<div>
					<p className="font-semibold">First Participation</p>
					<p className="text-gray-600">Year: {data.firstParticipationYear}</p>
				</div>

				{data.fastestLapDriverId && (
					<div>
						<p className="font-semibold">Fastest Lap Record</p>
						<p className="text-gray-600">
							Driver: {formatId(data.fastestLapDriverId)}
						</p>
						<p className="text-gray-600">
							Team: {formatId(data.fastestLapTeamId)}
						</p>
						<p className="text-gray-600">Year: {data.fastestLapYear}</p>
						<p className="text-gray-600">Time: {data.lapRecord}</p>
					</div>
				)}
			</div>
		</div>
	);
}
