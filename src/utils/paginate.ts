export type PagedArray<T> = {
	isFirstPage: boolean;
	isLastPage: boolean;
	prevPage: number | null;
	currentPage: number;
	nextPage: number | null;
	totalPages: number;
	totalItems: number;
	items: T[];
	firstItemNumber: number;
};

export function paginate<T>(items: T[], page = 1, perPage = 5): PagedArray<T> {
	const offset = perPage * (page - 1);
	const firstItemNumber = offset + 1;
	const totalPages = Math.ceil(items.length / perPage);
	const paginatedItems = items.slice(offset, perPage * page);

	const prevPage = page - 1 ? page - 1 : null;
	const nextPage = totalPages > page ? page + 1 : null;

	return {
		isFirstPage: prevPage === null,
		isLastPage: nextPage === null,
		prevPage,
		currentPage: page,
		nextPage,
		totalPages,
		totalItems: items.length,
		items: paginatedItems,
		firstItemNumber,
	};
}
