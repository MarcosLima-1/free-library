import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";

interface ConfimationDialogProps {
	children: ReactNode;
	onClickConfirm?: () => void;
	onClickCancel?: () => void;
	confirmButtonVariant?: "default" | "destructive";
	confirmButtonLabel?: string;
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title: string;
	description?: string;
}

export function ConfimationDialog({
	confirmButtonVariant = "default",
	confirmButtonLabel = "Confirmar",
	className,
	onClickCancel,
	onClickConfirm,
	description,
	title,
}: ConfimationDialogProps) {
	function handleCancelClick() {
		onClickCancel?.();
	}
	function handleConfirmClick() {
		onClickConfirm?.();
	}
	return (
		<Dialog.Presets.Basic className={cn("h-[200px] max-w-xl", className)}>
			<Dialog.Header>
				<Dialog.Title>{title}</Dialog.Title>
				{description && <Dialog.Tescription>{description}</Dialog.Tescription>}
			</Dialog.Header>
			<Dialog.Footer>
				<Dialog.Trigger asChild>
					<Button onClick={handleCancelClick} variant="outline">
						Cancelar
					</Button>
				</Dialog.Trigger>
				<Dialog.Trigger asChild>
					<Button variant={confirmButtonVariant} onClick={handleConfirmClick}>
						{confirmButtonLabel}
					</Button>
				</Dialog.Trigger>
			</Dialog.Footer>
		</Dialog.Presets.Basic>
	);
}
