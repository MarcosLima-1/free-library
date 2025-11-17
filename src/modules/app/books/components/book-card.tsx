import { BookOpen } from "lucide-react";
import { Image } from "@/components/misc/image";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { BookModal } from "@/modules/app/books/components/book-modal";
import type { BookVolume } from "@/schemas/book";

interface BookCardProps {
	bookVolume: BookVolume;
}

export function BookCard({ bookVolume }: BookCardProps) {
	const book = bookVolume.volumeInfo;
	const thumbnail = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;

	return (
		<Dialog.Provider>
			<Dialog.Trigger asChild>
				<Card.Container
					title={book.title}
					className="group cursor-pointer overflow-hidden border-border transition-all duration-300 hover:shadow-lg"
				>
					<div className="relative aspect-2/3 bg-muted">
						{thumbnail ? (
							<Image
								src={thumbnail.replace("http://", "https://") || "/placeholder.svg"}
								alt={book.title}
								width={200}
								height={200}
								className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center">
								<BookOpen className="h-12 w-12 text-muted-foreground" />
							</div>
						)}
					</div>
					<div className="p-3">
						<h3 className="mb-1 line-clamp-2 text-balance font-semibold text-foreground text-sm">{book.title}</h3>
						{book.authors && book.authors.length > 0 && (
							<p className="line-clamp-1 text-muted-foreground text-xs">{book.authors.join(", ")}</p>
						)}
					</div>
				</Card.Container>
			</Dialog.Trigger>
			<BookModal bookVolume={bookVolume} />
		</Dialog.Provider>
	);
}
