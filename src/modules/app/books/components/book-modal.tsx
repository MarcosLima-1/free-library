import { BookOpen, Download, ExternalLink, Eye } from "lucide-react";
import { Image } from "@/components/misc/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { BookVolume } from "@/schemas/book";

interface BookModalProps {
	bookVolume: BookVolume;
}

export function BookModal({ bookVolume }: BookModalProps) {
	const book = bookVolume.volumeInfo;

	const thumbnail = book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail;
	const hasPdf = bookVolume.accessInfo?.pdf?.isAvailable;
	const hasEpub = bookVolume.accessInfo?.epub?.isAvailable;
	const hasWebReader = bookVolume.accessInfo?.webReaderLink;

	const handleDownload = (format: "pdf" | "epub") => {
		const link = format === "pdf" ? bookVolume.accessInfo?.pdf?.downloadLink : bookVolume.accessInfo?.epub?.downloadLink;

		if (link) {
			window.open(link, "_blank");
		}
	};

	const handleRead = () => {
		if (hasWebReader) {
			window.open(bookVolume.accessInfo?.webReaderLink, "_blank");
		} else if (book.previewLink) {
			window.open(book.previewLink, "_blank");
		}
	};

	return (
		<Dialog.Presets.Basic>
			<Dialog.Header>
				<Dialog.Title className="text-balance text-2xl">{book.title}</Dialog.Title>
			</Dialog.Header>

			<div className="grid gap-6 md:grid-cols-[200px_1fr]">
				<div className="flex justify-center md:justify-start">
					<div className="aspect-2/3 h-auto w-[200px] shrink-0 overflow-hidden rounded-lg bg-muted shadow-lg">
						{thumbnail ? (
							<Image src={thumbnail} alt={book.title} width={200} height={300} className="object-cover" sizes="200px" />
						) : (
							<div className="flex h-full w-full items-center justify-center">
								<BookOpen className="h-16 w-16 text-muted-foreground" />
							</div>
						)}
					</div>
				</div>

				<div className="space-y-4">
					{book.authors && book.authors.length > 0 && (
						<div>
							<h3 className="mb-1 font-semibold text-muted-foreground text-sm">Autor(es)</h3>
							<p className="text-foreground">{book.authors.join(", ")}</p>
						</div>
					)}

					<div className="flex flex-wrap gap-4 text-sm">
						{book.publisher && (
							<div>
								<span className="text-muted-foreground">Editora: </span>
								<span className="text-foreground">{book.publisher}</span>
							</div>
						)}
						{book.publishedDate && (
							<div>
								<span className="text-muted-foreground">Ano: </span>
								<span className="text-foreground">{book.publishedDate}</span>
							</div>
						)}
						{book.pageCount && (
							<div>
								<span className="text-muted-foreground">Páginas: </span>
								<span className="text-foreground">{book.pageCount}</span>
							</div>
						)}
					</div>

					{book.categories && book.categories.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{book.categories.map((category) => (
								<Badge key={category} variant="secondary">
									{category}
								</Badge>
							))}
						</div>
					)}

					{book.description && (
						<div>
							<h3 className="mb-2 font-semibold text-muted-foreground text-sm">Sinopse</h3>
							<div className="prose prose-sm max-w-none text-foreground text-sm leading-relaxed">{book.description}</div>
						</div>
					)}

					<div className="flex flex-wrap gap-2 pt-4">
						{hasWebReader && (
							<Button onClick={handleRead} className="gap-2">
								<Eye className="h-4 w-4" />
								Ler Online
							</Button>
						)}

						{hasPdf && bookVolume.accessInfo?.pdf?.downloadLink && (
							<Button onClick={() => handleDownload("pdf")} variant="secondary" className="gap-2">
								<Download className="h-4 w-4" />
								Download PDF
							</Button>
						)}

						{hasEpub && bookVolume.accessInfo?.epub?.downloadLink && (
							<Button onClick={() => handleDownload("epub")} variant="secondary" className="gap-2">
								<Download className="h-4 w-4" />
								Download EPUB
							</Button>
						)}

						{book.previewLink && !hasWebReader && (
							<Button onClick={handleRead} variant="outline" className="gap-2">
								<ExternalLink className="h-4 w-4" />
								Preview
							</Button>
						)}
					</div>

					{!hasPdf && !hasEpub && !hasWebReader && (
						<p className="text-muted-foreground text-sm italic">
							Este livro pode ter disponibilidade limitada para download ou leitura online.
						</p>
					)}
				</div>
			</div>
		</Dialog.Presets.Basic>
	);
}
