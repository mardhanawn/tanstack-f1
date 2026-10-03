import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 10 * 60 * 1000,
				gcTime: 15 * 60 * 1000,
			},
		},
	});
}
