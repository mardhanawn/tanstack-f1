const API_URL = import.meta.env.VITE_F1_API_URL;

export type ApiError = { status: number; message: string };

export type ApiResponse<T> = T | ApiError;

export async function apiGet<T>(
	path: string,
	params?: Record<string, string | number>,
): Promise<ApiResponse<T>> {
	try {
		const url = new URL(path, API_URL);

		if (params)
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, String(value));
			});

		const response = await fetch(url.toString());

		if (!response.ok) {
			let message = `HTTP ${response.status}`;

			try {
				const errorData = (await response.json()) as unknown;
				if (
					typeof errorData === "object" &&
					errorData !== null &&
					"message" in errorData &&
					typeof (errorData as Record<string, unknown>).message === "string"
				)
					message = (errorData as Record<string, unknown>).message as string;
			} catch {
				// Failed to parse error JSON, use default message
			}

			return { status: response.status, message };
		}

		const data = (await response.json()) as T;
		return data;
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error occurred";

		return { status: 0, message };
	}
}
