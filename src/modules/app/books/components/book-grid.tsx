import { BookCard } from "@/modules/app/books/components/book-card";
import type { BookVolume } from "@/schemas/book";

interface BookGridProps {
	books: BookVolume[];
}

export function BookGrid({ books }: BookGridProps) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl2:grid-cols-6 xl:grid-cols-5">
			{books.map((book) => (
				<BookCard key={book.id} bookVolume={book} />
			))}
		</div>
	);
}
