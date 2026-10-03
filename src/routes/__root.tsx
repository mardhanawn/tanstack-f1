import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	Link,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { RouterContext } from "../router";

import "../styles.css";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen flex flex-col">
				<nav className="bg-gray-800 text-white p-4">
					<div className="flex gap-4">
						<Link to="/" className="hover:text-gray-200">
							Home
						</Link>
						<Link to="/debug" className="hover:text-gray-200">
							Debug
						</Link>
					</div>
				</nav>
				<main className="flex-1">
					<Outlet />
				</main>
			</div>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "TanStack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}
