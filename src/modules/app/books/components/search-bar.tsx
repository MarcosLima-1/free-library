import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	loading: boolean;
	searchQuery: string;
}

export function SearchBar({ loading, searchQuery }: SearchBarProps) {
	const navigate = useNavigate();
	const [query, setQuery] = useState(searchQuery ?? "");
	const handleSubmit = (e: React.FormEvent) => {
		navigate({ to: "/", search: { q: query } });
		e.preventDefault();
	};

	const handleClear = () => {
		setQuery("");
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<div className="relative flex-1">
				<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Buscar por título, autor ou categoria..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="pr-10 pl-10"
				/>
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
			<Button type="submit" disabled={loading || !query.trim()}>
				{loading ? "Buscando..." : "Buscar"}
			</Button>
		</form>
	);
}
