"use client";

import type { ReactNode } from "react";

/**
 * A wooden plaque, cut from the same board as the REFRESHER sign. The PNG has
 * rounded corners baked into its alpha, so it's stretched to the element's box
 * (the texture is noise, so the distortion doesn't read).
 *
 * Sizing and layout come from `className` — the footer wants a small pill, the
 * welcome screen wants a tall two-line card.
 */
const PLAQUE_STYLE = {
	backgroundImage: "url(/btn-bg.png)",
	backgroundSize: "100% 100%",
	backgroundRepeat: "no-repeat",
	textShadow: "0 0.15vh 0.4vh rgba(0,0,0,0.55)",
} as const;

const PLAQUE_CLASS =
	"press cute-notebook cursor-pointer text-cream drop-shadow-md drop-shadow-black/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35";

export function Plaque({
	children,
	onClick,
	disabled = false,
	className = "",
}: {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			style={PLAQUE_STYLE}
			className={`${PLAQUE_CLASS} ${className}`}
		>
			{children}
		</button>
	);
}

/** The same plaque, but it goes somewhere. */
export function PlaqueLink({
	children,
	href,
	className = "",
}: {
	children: ReactNode;
	href: string;
	className?: string;
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={PLAQUE_STYLE}
			className={`${PLAQUE_CLASS} ${className}`}
		>
			{children}
		</a>
	);
}
