import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import type { BookVolume } from "@/schemas/book";

interface SearchBooksRequest {
	query: string;
}

interface SearchBooksResponse {
	items?: BookVolume[];
}

async function searchBooks({ query }: SearchBooksRequest) {
	const parsedQuery = encodeURIComponent(query);

	const { data } = await axios.get<SearchBooksResponse>(`https://www.googleapis.com/books/v1/volumes`, {
		params: {
			q: parsedQuery,
			filter: "free-ebooks",
			maxResults: 40,
			langRestrict: "pt",
		},
	});
	return data;
}

export function searchBooksOptions({ query }: SearchBooksRequest) {
	return queryOptions({
		queryKey: ["search-books", { query }],
		queryFn: () => searchBooks({ query }),
		select: (data) => {
			if (!data.items) return [];
			return data.items.map((bookInfo) => {
				return bookInfo;
			});
		},
	});
}
