import { z } from "zod/v4";

const IndustryIdentifierSchema = z.object({
	type: z.string(),
	identifier: z.string(),
});

const ReadingModesSchema = z.object({
	text: z.boolean(),
	image: z.boolean(),
});

const PanelizationSummarySchema = z.object({
	containsEpubBubbles: z.boolean(),
	containsImageBubbles: z.boolean(),
});

const ImageLinksSchema = z.object({
	smallThumbnail: z.url(),
	thumbnail: z.url(),
});

const VolumeInfoSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	publishedDate: z.string(),
	authors: z.array(z.string()).optional(),
	industryIdentifiers: z.array(IndustryIdentifierSchema).optional(),
	readingModes: ReadingModesSchema,
	pageCount: z.number().int(),
	printType: z.string(),
	categories: z.array(z.string()).optional(),
	maturityRating: z.string(),
	allowAnonLogging: z.boolean(),
	contentVersion: z.string(),
	panelizationSummary: PanelizationSummarySchema.optional(),
	imageLinks: ImageLinksSchema.optional(),
	language: z.string(),
	publisher: z.string(),
	previewLink: z.url(),
	infoLink: z.url(),
	canonicalVolumeLink: z.url(),
});

const SaleInfoSchema = z.object({
	country: z.string(),
	saleability: z.string(),
	isEbook: z.boolean(),
	buyLink: z.url().optional(),
});

const DownloadLinkSchema = z.object({
	isAvailable: z.boolean(),
	downloadLink: z.url().optional(),
});

const AccessInfoSchema = z.object({
	country: z.string(),
	viewability: z.string(),
	embeddable: z.boolean(),
	publicDomain: z.boolean(),
	textToSpeechPermission: z.string(),
	epub: DownloadLinkSchema,
	pdf: DownloadLinkSchema,
	webReaderLink: z.url(),
	accessViewStatus: z.string(),
	quoteSharingAllowed: z.boolean(),
});

const SearchInfoSchema = z.object({
	textSnippet: z.string(),
});

export const BookVolumeSchema = z.object({
	kind: z.literal("books#volume"),
	id: z.string(),
	etag: z.string(),
	selfLink: z.url(),
	volumeInfo: VolumeInfoSchema,
	saleInfo: SaleInfoSchema,
	accessInfo: AccessInfoSchema,
	searchInfo: SearchInfoSchema.optional(),
});

export type BookVolume = z.infer<typeof BookVolumeSchema>;
