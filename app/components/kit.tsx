"use client";

import type { ReactNode } from "react";
import { chapterLabel, type ChapterId } from "../lib/guide-data";
import { Icon, type IconName } from "./icons";

/** A little taped-on paper label. */
export function Sticker({
	children,
	className = "",
	rotate = "-2deg",
	icon,
}: {
	children: ReactNode;
	className?: string;
	rotate?: string;
	icon?: IconName;
}) {
	return (
		<span
			style={{ rotate }}
			className={`cute-notebook inline-flex items-center gap-[0.5vw] rounded-[0.8vh] border-[0.25vh] border-dashed border-choco/30 bg-white px-[0.9vw] py-[0.5vh] text-[2.1vh] leading-none text-ink shadow-[0.2vh_0.3vh_0_rgba(107,63,34,0.12)] ${className}`}
		>
			{icon && <Icon name={icon} className="text-[2.3vh] text-accent" />}
			{children}
		</span>
	);
}

/**
 * Slide heading: a quiet letterspaced eyebrow, then the title. The eyebrow is
 * set in the plain sans on purpose — it reads as a label rather than competing
 * with the display face used for the title.
 */
export function StepHead({
	chapter,
	kicker,
	title,
	sub,
}: {
	/** a chapter id — renders the numbered chapter eyebrow */
	chapter?: ChapterId;
	/** free text, for the few slides that sit outside a chapter */
	kicker?: string;
	title: string;
	sub: string;
}) {
	const label = chapter ? chapterLabel(chapter) : kicker;
	return (
		<div className="flex shrink-0 flex-col items-center gap-[0.7vh] text-center">
			{label && (
				<span className="flex items-center gap-[0.9vw] text-[1.55vh] leading-none text-choco/45 capitalize">
					<span className="h-[0.2vh] w-[3.5vh] bg-choco/20" />
					<span
						style={{
							fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
						}}
					>
						{label}
					</span>
					<span className="h-[0.2vh] w-[3.5vh] bg-choco/20" />
				</span>
			)}
			<h1 className="cute-notebook text-[5.2vh] leading-[1.02] font-semibold text-ink">
				{title}
			</h1>
			<p className="cute-notebook max-w-[84ch] text-[2.5vh] leading-[1.25] text-choco/75">
				{sub}
			</p>
		</div>
	);
}

/** A big pickable card. Shows a checkmark tab when chosen. */
export function PickCard({
	selected,
	onClick,
	children,
	className = "",
	label,
}: {
	selected: boolean;
	onClick: () => void;
	children: ReactNode;
	className?: string;
	label?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={selected}
			aria-label={label}
			className={`press group relative flex cursor-pointer flex-col rounded-[1.2vh] border-[0.35vh] bg-paper p-[1.4vh] text-left ${
				selected
					? "border-solid border-accent shadow-[0_0_0_0.45vh_var(--accent-soft),0.4vh_0.6vh_0_rgba(107,63,34,0.18)]"
					: "border-dashed border-choco/25 hover:border-choco/45 hover:bg-white"
			} ${className}`}
		>
			{selected && (
				<span className="stamp-in absolute -top-[1.5vh] -right-[1vh] flex h-[3.4vh] w-[3.4vh] items-center justify-center rounded-full border-[0.3vh] border-white bg-accent text-[1.8vh] text-white shadow-[0.2vh_0.3vh_0_rgba(107,63,34,0.2)]">
					<Icon name="check" strokeWidth={2.6} />
				</span>
			)}
			{children}
		</button>
	);
}

/** Small tappable chip. */
export function Chip({
	children,
	onClick,
	active = false,
	className = "",
}: {
	children: ReactNode;
	onClick?: () => void;
	active?: boolean;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-pressed={active}
			className={`press cute-notebook cursor-pointer rounded-full border-[0.25vh] px-[1vw] py-[0.75vh] text-[2.2vh] leading-none ${
				active
					? "border-solid border-accent bg-accent text-white"
					: "border-dashed border-choco/30 bg-white text-ink hover:bg-accent-soft"
			} ${className}`}
		>
			{children}
		</button>
	);
}

/** The dashed "try it" tray that holds every interactive toy. */
export function Tray({
	title,
	icon,
	children,
	className = "",
}: {
	title: string;
	icon: IconName;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`relative flex min-h-0 flex-col rounded-[1.4vh] border-[0.3vh] border-dashed border-choco/25 bg-accent-soft/60 p-[1.6vh] pt-[2.2vh] ${className}`}
		>
			<span className="cute-notebook absolute -top-[1.5vh] left-[1.4vh] flex items-center gap-[0.5vw] rounded-[0.7vh] border-[0.25vh] border-dashed border-choco/30 bg-white px-[0.8vw] py-[0.4vh] text-[1.95vh] leading-none text-choco">
				<Icon name={icon} className="text-[2.1vh] text-accent" />
				{title}
			</span>
			{children}
		</div>
	);
}

/** Tiny italic aside. */
export function Hint({ children }: { children: ReactNode }) {
	return (
		<p className="cute-notebook text-[2.05vh] leading-[1.3] text-choco/60 italic">
			{children}
		</p>
	);
}

/** Checklist row that stamps itself when clicked. */
export function CheckRow({
	done,
	onToggle,
	children,
}: {
	done: boolean;
	onToggle: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-pressed={done}
			className="press flex w-full cursor-pointer items-center gap-[0.8vw] rounded-[0.9vh] px-[0.6vw] py-[1vh] text-left hover:bg-white/70"
		>
			<span
				className={`flex h-[3vh] w-[3vh] shrink-0 items-center justify-center rounded-[0.5vh] border-[0.3vh] text-[1.8vh] ${
					done
						? "border-solid border-accent bg-accent text-white"
						: "border-dashed border-choco/35 bg-white text-transparent"
				}`}
			>
				<Icon name="check" strokeWidth={2.6} />
			</span>
			<span
				className={`cute-notebook text-[2.45vh] leading-[1.2] ${
					done ? "text-choco/45 line-through" : "text-ink"
				}`}
			>
				{children}
			</span>
		</button>
	);
}
