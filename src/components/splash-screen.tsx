import { BookOpenIcon } from "lucide-react";

export function SplashScreen() {
	return (
		<div className="flex h-svh w-full items-center justify-center">
			<div className="flex flex-col items-center gap-2">
				<BookOpenIcon className="size-24 animate-pulse text-primary duration-1000" />
				<p className="font-medium text-lg text-muted-foreground">Carregando o conhecimento...</p>
			</div>
		</div>
	);
}
