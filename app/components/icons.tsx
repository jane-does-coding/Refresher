import type { CSSProperties, ReactNode } from "react";

/**
 * Hand-drawn-ish line icons, all on a 24×24 grid, all stroked in
 * `currentColor` so they pick up whatever colour the surrounding text is.
 * Placeholders for now — swap individual paths for real artwork later.
 */
const ICONS = {
	/* --- drinks & desserts --- */
	boba: (
		<>
			<path d="M6.4 7.5h11.2l-1.2 11.6a2.4 2.4 0 0 1-2.4 2.1h-4a2.4 2.4 0 0 1-2.4-2.1Z" />
			<path d="M5.4 5.2h13.2v2.3H5.4Z" />
			<path d="M13.6 5.2 15.4 1.8" />
			<circle cx="9.6" cy="16.4" r="1.1" />
			<circle cx="13" cy="18" r="1.1" />
			<circle cx="14.9" cy="14.6" r="1.1" />
		</>
	),
	cake: (
		<>
			<path d="M3.6 20.6h16.8" />
			<path d="M5.4 20.6v-7.4" />
			<path d="M18.6 20.6v-7.4" />
			<path d="M5.4 16.8h13.2" />
			<path d="M5.4 13.2q2.2-2.6 4.4 0" />
			<path d="M9.8 13.2q2.2-2.6 4.4 0" />
			<path d="M14.2 13.2q2.2-2.6 4.4 0" />
			<path d="M12 11.8V9" />
			<path d="M12 8.4a1.3 1.3 0 1 0 0-2 1.3 1.3 0 0 0 0 2Z" />
		</>
	),
	cone: (
		<>
			<path d="M8 12.8 12 21.8l4-9Z" />
			<path d="M8 12.8a4 4 0 0 1 8 0" />
			<path d="M8.9 9.8a3.1 3.1 0 0 1 6.2 0" />
			<path d="M9.9 6.9a2.1 2.1 0 0 1 4.2 0" />
		</>
	),
	candy: (
		<>
			<circle cx="12" cy="12" r="4.2" />
			<path d="M7.9 11.2 3.8 8.4v7.2l4.1-2.8" />
			<path d="M16.1 11.2l4.1-2.8v7.2l-4.1-2.8" />
		</>
	),
	donut: (
		<>
			<circle cx="12" cy="12" r="8" />
			<circle cx="12" cy="12" r="3" />
			<path d="M8.4 6.8l1 1.4" />
			<path d="M15.8 8.2l1.2-1.1" />
			<path d="M6.6 14.9l1.5-.4" />
			<path d="M16.6 16.4l1 1" />
		</>
	),

	/* --- fruit & flavours (palette marks) --- */
	strawberry: (
		<>
			<path d="M12 21.6c-3.5-1.6-6.3-4.3-6.3-7 0-2.5 2.7-4.4 6.3-4.4s6.3 1.9 6.3 4.4c0 2.7-2.8 5.4-6.3 7Z" />
			<path d="M7.9 10.4 12 6.9l4.1 3.5" />
			<path d="M12 6.9V3.8" />
		</>
	),
	matcha: (
		<>
			<path d="M4.4 10.2h15.2l-1.4 7a3.2 3.2 0 0 1-3.1 2.6H8.9a3.2 3.2 0 0 1-3.1-2.6Z" />
			<path d="M9.4 7.4c1-1.4 0-2.4 1-3.8" />
			<path d="M14 7.4c1-1.4 0-2.4 1-3.8" />
		</>
	),
	blueberry: (
		<>
			<circle cx="12" cy="14" r="6.4" />
			<path d="M12 8.2V5.4" />
			<path d="M9.4 9.2 7.9 7.2" />
			<path d="M14.6 9.2 16.1 7.2" />
		</>
	),
	honey: (
		<>
			<path d="M6.6 8.6h10.8v9.6a2.6 2.6 0 0 1-2.6 2.6H9.2a2.6 2.6 0 0 1-2.6-2.6Z" />
			<path d="M5.8 5.6h12.4v3H5.8Z" />
			<path d="M12 12v3.6" />
		</>
	),
	lemon: (
		<>
			<ellipse cx="12" cy="12" rx="8" ry="5.6" transform="rotate(-28 12 12)" />
			<path d="M17.4 6.2l1.6-1.4" />
			<path d="M12 12l-3.4 3.4" />
		</>
	),
	cherry: (
		<>
			<circle cx="8.4" cy="17.2" r="3" />
			<circle cx="15.8" cy="18" r="3" />
			<path d="M8.4 14.2C10 9.4 12.2 7 15.4 5.2" />
			<path d="M15.8 15C15.2 11 15.2 7.8 15.4 5.2" />
			<path d="M15.4 5.2c1.8-.6 3.2-.2 4.4 1.2" />
		</>
	),

	/* --- setup --- */
	toolbox: (
		<>
			<path d="M3.4 9.2h17.2v9.6H3.4Z" />
			<path d="M8.8 9.2V7a1.6 1.6 0 0 1 1.6-1.6h3.2A1.6 1.6 0 0 1 15.2 7v2.2" />
			<path d="M9.8 13.6h4.4" />
		</>
	),
	terminal: (
		<>
			<path d="M3.2 5.2h17.6v13.6H3.2Z" />
			<path d="M6.8 10 9.4 12.6 6.8 15.2" />
			<path d="M12.4 15.2h4.8" />
		</>
	),
	apple: (
		<>
			<path d="M12 8.6c-1.6-1.7-4.8-1.6-6.1 1-1.5 2.9.4 9 3.5 11.1 1.2.9 2.3 0 2.6 0s1.4.9 2.6 0c3.1-2.1 5-8.2 3.5-11.1-1.3-2.6-4.5-2.7-6.1-1Z" />
			<path d="M12.4 8.6c0-2.2 1.1-3.8 3.3-4.3 0 2.2-1.1 3.8-3.3 4.3Z" />
		</>
	),
	window: (
		<>
			<path d="M4 4h16v16H4Z" />
			<path d="M12 4v16" />
			<path d="M4 12h16" />
		</>
	),
	penguin: (
		<>
			<path d="M12 3.2c-3.4 0-5.6 3-5.6 8.2 0 5.6 2.4 9.4 5.6 9.4s5.6-3.8 5.6-9.4c0-5.2-2.2-8.2-5.6-8.2Z" />
			<path d="M12 10.4c-1.7 0-2.7 1.8-2.7 5s1 5 2.7 5 2.7-1.8 2.7-5-1-5-2.7-5Z" />
			<circle cx="10.3" cy="7.6" r=".8" fill="currentColor" stroke="none" />
			<circle cx="13.7" cy="7.6" r=".8" fill="currentColor" stroke="none" />
			<path d="M11 9.2h2l-1 1.4Z" />
			<path d="M9.6 20.6 7.4 22M14.4 20.6 16.6 22" />
		</>
	),
	dice: (
		<>
			<path d="M4.2 4.2h15.6v15.6H4.2Z" />
			<circle cx="8.2" cy="8.2" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="15.8" cy="8.2" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="8.2" cy="15.8" r="1.1" fill="currentColor" stroke="none" />
			<circle cx="15.8" cy="15.8" r="1.1" fill="currentColor" stroke="none" />
		</>
	),
	person: (
		<>
			<circle cx="12" cy="8.6" r="3.6" />
			<path d="M5.4 20.4a6.6 6.6 0 0 1 13.2 0" />
		</>
	),

	/* --- making things --- */
	palette: (
		<>
			<path d="M12 3.4a8.6 8.6 0 1 0 2 17c1.2-.3 1.3-1.6.6-2.3-1-1-.6-2.7.9-2.9h1.6a4 4 0 0 0 4-4c0-4.4-4.1-7.8-9.1-7.8Z" />
			<path d="M8.4 9.4h.01M12.6 7.8h.01M8 13.8h.01" />
		</>
	),
	letters: (
		<>
			<path d="M3.6 18.4 8.2 5.6l4.6 12.8" />
			<path d="M5.4 14.4h5.6" />
			<circle cx="17.4" cy="15.4" r="2.9" />
			<path d="M20.3 12.5v5.9" />
		</>
	),
	ruler: (
		<>
			<path d="M4.4 19.6h15.2L4.4 4.4Z" />
			<path d="M7.6 16.4v-2.6M11 16.4v-2.6M14.4 16.4v-2.6" />
		</>
	),
	pencil: (
		<>
			<path d="m4 20 1.2-4.4L16 4.8l3.2 3.2L8.4 18.8Z" />
			<path d="m14.8 6 3.2 3.2" />
		</>
	),
	brush: (
		<>
			<path d="M14.6 3.6l5.8 5.8-8 8H7.4l-1.8-1.8Z" />
			<path d="M5.6 15.6C3.8 17.4 3.4 20 3.4 20.6c1.4.4 3.6.2 5.2-1.4" />
		</>
	),
	cursor: (
		<>
			<path d="M5.6 3.2 18.8 11l-5.4 1.6-1.6 5.4Z" />
		</>
	),
	clipboard: (
		<>
			<path d="M6 4.8h12v16.4H6Z" />
			<path d="M9.4 2.8h5.2v3.4H9.4Z" />
			<path d="M9.4 11.6h5.6M9.4 15.4h3.6" />
		</>
	),
	checklist: (
		<>
			<path d="m3.6 7.4 2 2 3.4-3.6" />
			<path d="m3.6 16.4 2 2 3.4-3.6" />
			<path d="M12.8 8.4h7.6M12.8 17.4h7.6" />
		</>
	),
	check: <path d="m4.6 12.6 4.6 4.6L19.4 6.8" />,
	chevron: <path d="m6.4 9.6 5.6 5.6 5.6-5.6" />,
	code: (
		<>
			<path d="m8.6 8.4-4.2 3.6 4.2 3.6" />
			<path d="m15.4 8.4 4.2 3.6-4.2 3.6" />
			<path d="m13.4 5.4-2.8 13.2" />
		</>
	),
	braces: (
		<>
			<path d="M9.4 3.6c-2 0-2.6 1.2-2.6 3.2 0 1.8-.4 3.6-2.2 3.6v1.2c1.8 0 2.2 1.8 2.2 3.6 0 2 .6 3.2 2.6 3.2" />
			<path d="M14.6 3.6c2 0 2.6 1.2 2.6 3.2 0 1.8.4 3.6 2.2 3.6v1.2c-1.8 0-2.2 1.8-2.2 3.6 0 2-.6 3.2-2.6 3.2" />
		</>
	),
	folder: (
		<>
			<path d="M3.4 6.4h5.6l1.8 2.4h9.8v10.8H3.4Z" />
			<path d="M3.4 11.6h17" />
		</>
	),
	eye: (
		<>
			<path d="M2.6 12S6 6.4 12 6.4 21.4 12 21.4 12 18 17.6 12 17.6 2.6 12 2.6 12Z" />
			<circle cx="12" cy="12" r="2.8" />
		</>
	),
	copy: (
		<>
			<path d="M8.6 8.6h11v11h-11Z" />
			<path d="M15.4 8.6V4.4h-11v11h4.2" />
		</>
	),
	bulb: (
		<>
			<path d="M12 3.4a5.6 5.6 0 0 0-3.2 10.2v2.2h6.4v-2.2A5.6 5.6 0 0 0 12 3.4Z" />
			<path d="M9.6 19h4.8" />
			<path d="M10.4 21.2h3.2" />
		</>
	),
	play: (
		<>
			<circle cx="12" cy="12" r="8.6" />
			<path d="M10 8.4 16 12l-6 3.6Z" />
		</>
	),
	download: (
		<>
			<path d="M12 3.6v10.8" />
			<path d="m7.8 10.6 4.2 4.2 4.2-4.2" />
			<path d="M4.8 19.6h14.4" />
		</>
	),
	fileCode: (
		<>
			<path d="M6 2.8h8l4 4v14.4H6Z" />
			<path d="M14 2.8v4h4" />
			<path d="m10.4 12.4-1.6 2 1.6 2M13.6 12.4l1.6 2-1.6 2" />
		</>
	),
	fileBrush: (
		<>
			<path d="M6 2.8h8l4 4v14.4H6Z" />
			<path d="M14 2.8v4h4" />
			<path d="M9 17c1.8-4.4 3.4-4.4 5.4-1.4" />
		</>
	),
	fileText: (
		<>
			<path d="M6 2.8h8l4 4v14.4H6Z" />
			<path d="M14 2.8v4h4" />
			<path d="M9 13.4h6" />
			<path d="M9 16.8h4" />
		</>
	),

	/* --- shipping & celebrating --- */
	rocket: (
		<>
			<path d="M12 2.8c3.1 3.1 4.6 6.7 4.6 10.4L12 16.4l-4.6-3.2C7.4 9.5 8.9 5.9 12 2.8Z" />
			<circle cx="12" cy="9" r="1.7" />
			<path d="m7.6 13.4-2.8 4.4 3.8-1.2M16.4 13.4l2.8 4.4-3.8-1.2" />
			<path d="m10.4 17.6 1.6 3.6 1.6-3.6" />
		</>
	),
	sparkle: (
		<>
			<path d="M12 3.4l1.7 4.9 4.9 1.7-4.9 1.7-1.7 4.9-1.7-4.9-4.9-1.7 4.9-1.7Z" />
			<path d="M18.6 16.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" />
		</>
	),
	confetti: (
		<>
			<path d="M3.2 20.8 6.6 12l8.8 3.4Z" />
			<path d="M13.6 4.4v2.6M18.2 6.6l-1.6 1.8M20.6 12h-2.6" />
			<circle cx="10.6" cy="7.4" r="1" fill="currentColor" stroke="none" />
			<circle cx="19.4" cy="17.2" r="1" fill="currentColor" stroke="none" />
		</>
	),
	gift: (
		<>
			<path d="M4.4 10.4h15.2v10.2H4.4Z" />
			<path d="M3.4 10.4h17.2" />
			<path d="M12 10.4v10.2" />
			<path d="M12 10.4C11 7 7.2 6.8 7.2 9.2c0 1 1 1.2 4.8 1.2Z" />
			<path d="M12 10.4C13 7 16.8 6.8 16.8 9.2c0 1-1 1.2-4.8 1.2Z" />
		</>
	),
	sprout: (
		<>
			<path d="M12 20.6v-7.4" />
			<path d="M12 13.2c-4.2 0-5.8-2.6-5.8-5.2 3.2 0 5.8 2.1 5.8 5.2Z" />
			<path d="M12 13.2c4.2 0 5.8-2.6 5.8-5.2-3.2 0-5.8 2.1-5.8 5.2Z" />
		</>
	),
	bolt: <path d="M13.6 2.6 6 13.8h4.6L9.8 21.4 18 9.8h-4.6Z" />,

	/* --- stickers --- */
	star: (
		<path d="m12 3.4 2.7 5.6 6.1.8-4.4 4.3 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.2 9.8l6.1-.8Z" />
	),
	heart: (
		<path d="M12 20.4S4.8 15.7 4.8 10.6a4.2 4.2 0 0 1 7.2-2.7 4.2 4.2 0 0 1 7.2 2.7c0 5.1-7.2 9.8-7.2 9.8Z" />
	),
	flower: (
		<>
			<circle cx="12" cy="7.4" r="2.8" />
			<circle cx="16.6" cy="12" r="2.8" />
			<circle cx="12" cy="16.6" r="2.8" />
			<circle cx="7.4" cy="12" r="2.8" />
			<circle cx="12" cy="12" r="1.8" />
		</>
	),
	cloud: (
		<path d="M6.8 18a4.2 4.2 0 0 1 .4-8.4 5.2 5.2 0 0 1 9.8-.6 4 4 0 0 1-.6 9Z" />
	),
	moon: (
		<path d="M15.6 3.4a9 9 0 1 0 5.2 13 7.8 7.8 0 0 1-5.2-13Z" />
	),
	ribbon: (
		<>
			<path d="M11.2 12C8 9.4 5 8.9 4.4 11c-.5 2.1 2.1 3.9 6.8 1Z" />
			<path d="M12.8 12c3.2-2.6 6.2-3.1 6.8-1 .5 2.1-2.1 3.9-6.8 1Z" />
			<circle cx="12" cy="12" r="1.5" />
			<path d="m10.8 13.4-2 6.8M13.2 13.4l2 6.8" />
		</>
	),
	leaf: (
		<>
			<path d="M4.6 19.4C4.6 10.2 10.8 4.6 19.4 4.6c0 8.6-5.6 14.8-14.8 14.8Z" />
			<path d="M4.6 19.4c4.2-4.2 8.6-8.6 14.8-14.8" />
		</>
	),
	shell: (
		<>
			<path d="M12 20.8 3.4 12.2a8.9 8.9 0 0 1 17.2 0Z" />
			<path d="M12 20.8V11.4" />
			<path d="M12 20.8 7.2 12.6" />
			<path d="M12 20.8 16.8 12.6" />
		</>
	),
	envelope: (
		<>
			<path d="M3.4 6.4h17.2v11.2H3.4Z" />
			<path d="m3.4 7.4 8.6 6.6 8.6-6.6" />
		</>
	),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof ICONS;

/**
 * Sized in `em`, so set the size with a text utility on the icon or its parent.
 * Stroke is in viewBox units, so small icons need a heavier `strokeWidth` and
 * big hero icons a lighter one to keep the optical weight even.
 */
export function Icon({
	name,
	className = "",
	style,
	strokeWidth = 2,
}: {
	name: IconName;
	className?: string;
	style?: CSSProperties;
	strokeWidth?: number;
}) {
	return (
		<svg
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			strokeWidth={strokeWidth}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={`inline-block shrink-0 ${className}`}
			style={style}
		>
			{ICONS[name]}
		</svg>
	);
}
