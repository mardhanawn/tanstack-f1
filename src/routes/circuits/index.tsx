import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { circuitsQueryOptions } from "#/features/circuits/queries";
import { formatId } from "#/lib/utils";

export const Route = createFileRoute("/circuits/")({
	component: CircuitsPage,
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(circuitsQueryOptions()),
});

function CircuitsPage() {
	const navigate = useNavigate();
	const { data } = useSuspenseQuery(circuitsQueryOptions());

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Circuits</h1>
			<div className="space-y-4">
				{data.circuits.map((circuit) => (
					<button
						key={circuit.id}
						type="button"
						onClick={() => navigate({ to: `/circuits/${circuit.id}` })}
						className="w-full text-left border p-4 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
					>
						<h2 className="text-xl font-semibold">{circuit.name}</h2>
						<p className="text-sm text-gray-600">
							{circuit.city}, {circuit.country}
						</p>
						<p className="text-sm text-gray-600">
							Length: {circuit.length}m • Corners: {circuit.corners}
						</p>

						{circuit.fastestLapDriverId && (
							<div className="mt-3 pt-3 border-t text-sm">
								<p className="font-semibold">Fastest Lap Record:</p>
								<p className="text-gray-600">
									Driver: {formatId(circuit.fastestLapDriverId)}
								</p>
								<p className="text-gray-600">
									Team: {formatId(circuit.fastestLapTeamId)}
								</p>
								<p className="text-gray-600">Year: {circuit.fastestLapYear}</p>
								<p className="text-gray-600">Time: {circuit.lapRecord}</p>
							</div>
						)}
					</button>
				))}
			</div>
			<p className="text-sm text-gray-500 mt-6">
				Total: {data.total} championships
			</p>
		</div>
	);
}
