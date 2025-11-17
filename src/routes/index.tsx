import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Library } from "lucide-react";
import { z } from "zod/v4";
import { searchBooksOptions } from "@/modules/app/books/api/search-books";
import { BookGrid } from "@/modules/app/books/components/book-grid";
import { SearchBar } from "@/modules/app/books/components/search-bar";

const searchParamsSchema = z.object({
	q: z.string().catch("food"),
});

export const Route = createFileRoute("/")({
	component: RouteComponent,
	validateSearch: searchParamsSchema,
	loader: ({ context: { queryClient } }) => {
		queryClient.prefetchQuery(searchBooksOptions({ query: "test" }));
	},
});

function RouteComponent() {
	const { q } = Route.useSearch();
	const { data, isPending } = useSuspenseQuery(searchBooksOptions({ query: q }));
	const books = data ?? [];
	return (
		<div className="min-h-screen w-full bg-background">
			<header className="sticky top-0 z-50 border-border border-b bg-card">
				<div className="container mx-auto px-4 py-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-primary p-2">
								<Library className="h-6 w-6 text-primary-foreground" />
							</div>
							<div>
								<h1 className="font-bold text-2xl text-foreground">Biblioteca Livre</h1>
								<p className="text-muted-foreground text-sm">Milhares de livros gratuitos</p>
							</div>
						</div>
						<div className="hidden items-center gap-2 text-muted-foreground text-sm md:flex">
							<BookOpen className="h-4 w-4" />
							<span>{books.length} livros encontrados</span>
						</div>
					</div>

					<SearchBar loading={isPending} searchQuery={q} />
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				{isPending && (
					<div className="flex min-h-[400px] items-center justify-center">
						<div className="text-center">
							<div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
							<p className="text-muted-foreground">Buscando livros...</p>
						</div>
					</div>
				)}
				{!isPending && books.length > 0 && <BookGrid books={books} />}
				{!isPending && books.length === 0 && (
					<div className="flex min-h-[400px] flex-col items-center justify-center text-center">
						<BookOpen className="mb-4 h-16 w-16 text-muted-foreground" />
						<h2 className="mb-2 font-semibold text-2xl text-foreground">Nenhum livro encontrado</h2>
						<p className="max-w-md text-muted-foreground">
							Tente buscar por título, autor ou categoria. Use termos em português ou inglês.
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
