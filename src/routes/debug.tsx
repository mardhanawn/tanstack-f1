import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { apiGet } from "#/lib/api";

export const Route = createFileRoute("/debug")({
	component: DebugComponent,
});

function DebugComponent() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["api", "current"],
		queryFn: () => apiGet<unknown>("/api/current"),
	});

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-4">Debug Page</h1>
			<p className="mb-4 text-gray-600">Testing API integration</p>

			{isLoading && <p>Loading...</p>}

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					<p>
						Error: {error instanceof Error ? error.message : "Unknown error"}
					</p>
				</div>
			)}

			{data !== undefined && (
				<div className="bg-gray-100 p-4 rounded overflow-auto">
					<pre className="text-sm">{String(JSON.stringify(data, null, 2))}</pre>
				</div>
			)}
		</div>
	);
}
