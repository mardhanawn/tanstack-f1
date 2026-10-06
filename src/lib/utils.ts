export function formatId(id: string | null): string {
	if (!id) return "-";
	return id
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
